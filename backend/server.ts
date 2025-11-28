import { addHours } from "date-fns";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify, { type FastifyRequest } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import * as ZodValidationError from "zod-validation-error";
import { Repository } from "./db.ts";
import * as user from "./models/users.ts";
import * as auth from "./models/auth.ts";
import * as slots from "./models/timeslots.ts";
import * as linktree from "./models/linktree.ts";
import { type JwtClaims, TokenManager } from "./token.ts";

declare module "fastify" {
  interface FastifyRequest {
    claims: JwtClaims;
  }
}

class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class DateError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "DateError";
  }
}

class SizeError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "SizeError";
  }
}

class NotValid extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    this.name = "NotValid";
  }
}

class RoleOnly extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = "RoleOnly";
  }
}

class ViolatedRule extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = "ViolatedRule";
  }
}

function start_web_server() {
  // Server initialization
  const web_server = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  const repo = new Repository();
  const token_manager = new TokenManager();

  web_server.register(cors, {
    origin: "http://localhost:1234",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  web_server.register(cookie, {});

  // Cookie verification
  web_server.addHook("preHandler", async (req, res) => {
    if (req.cookies.access_token) {
      const token_user = await token_manager
        .verify(req.cookies.access_token)
        .catch(() => {
          res.clearCookie("access_token");
          throw new NotValid("Token user not valid");
        });
      req.claims = token_user;
    }
  });

  // User information
  web_server.get(
    "/claims",
    async (req) => {
      return req.claims;
    },
  );

  // Error list
  web_server.setValidatorCompiler(validatorCompiler);
  web_server.setSerializerCompiler(serializerCompiler);
  web_server.setErrorHandler((err, req, reply) => {
    if (hasZodFastifySchemaValidationErrors(err)) {
      return reply.code(400).send({
        error: "Response Validation Error",
        statusCode: 400,
        details: {
          issues: err.validation,
          method: req.method,
          url: req.url,
        },
        message: ZodValidationError.fromError(err).toString(),
      });
    }

    if (isResponseSerializationError(err)) {
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Response doesn't match the schema",
        statusCode: 500,
        details: {
          issues: err.cause.issues,
          method: err.method,
          url: err.url,
        },
      });
    }
    // if (err.code === "23503") {
    //   return reply.code(400).send({
    //     error: "ForeignKeyError",
    //     message: "Foreign key doesn't exist",
    //   });
    // }

    // if (err.code === "23505") {
    //   return reply.code(409).send({
    //     error: "ConflictError",
    //     message: "A conflict occurred in the database",
    //   });
    // }

    if (
      err instanceof NotFoundError ||
      err instanceof DateError ||
      err instanceof SizeError ||
      err instanceof NotValid ||
      err instanceof RoleOnly ||
      err instanceof ViolatedRule
    ) {
      return reply.code(err.statusCode).send({
        error: err.name,
        message: err.message,
      });
    }

    return reply.code(500).send({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  });

  // Routes
  web_server.post<{ Body: { email: string; password: string } }>(
    "/auth",
    { schema: { body: z.object({ email: z.string(), password: z.string() }) } },
    async (req, res) => {
      if (await repo.login(req.body.email, req.body.password)) {
        const auth = await repo.getAuthByEmail(req.body.email);
        const user = await repo.getUserById(auth[0].id_user);
        const token_user = await token_manager.encode({
          sub: req.body.email
        });
        res.setCookie("access_token", token_user, {
          secure: false,
          sameSite: false,
          expires: addHours(new Date(), 1),
        });
        res.code(200);
      } else {
        throw new NotValid("Email or password is incorrect");
      }
    },
  );

  web_server.post<{ Body: auth.UserAuthRegister }>(
    "/register",
    {
      schema: { body: auth.ZUserAuthRegister },
    },
    async (req, res) => {
      const user = await repo.addUser({
        username: req.body.username,
        description: req.body.description,
        speciality: req.body.speciality,
        avatar: req.body.avatar
      });
      await repo.addAuth({
        email: req.body.email,
        password: req.body.password,
        id_user: user[0].id_user,
      });
      res.code(201);
    },
  );

  web_server.get("/users", async () => {
    const res = await repo.getUsers();
    return res;
  });

  web_server.get<{ Params: { id: number } }>(
    "/users/:id",
    {
      schema: { params: z.object({ id: z.coerce.number() }) },
    },
    async (req) => {
      const result = await repo.getUserById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("User not found");
      } else {
        return result;
      }
    },
  );

  web_server.put<{
    Params: { id: number }, Body: user.PartialUser;
  }>(
    "/users/:id",
    {
      schema: {
        params: z.object({ id: z.coerce.number() }),
        body: user.ZPartialUsers,
      },
    },
    async (req, res) => {
      const id = req.params.id;
      const user = await repo.getUserById(id);
      if (!user || user.length === 0) {
        throw new NotFoundError("User not found");
      }
      await repo.editUser(id, req.body);
      res.code(204);
    },
  );

  web_server.delete<{ Params: { id: number } }>(
    "/users/:id",
    {
      schema: { params: z.object({ id: z.coerce.number() }) },
    },
    async (req, res) => {
      const result = await repo.getUserById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("User not found");
      } else {
        await repo.deleteUserById(req.params.id);
        res.code(204);
      }
    },
  );

  web_server.get("/timeslots", async () => {
    const result = await repo.getSlots();
    return result;
  });

  web_server.get<{ Params: { id: number } }>(
    "/timeslots/:id",
    { schema: { params: z.object({ id: z.coerce.number() }) } },
    async (req) => {
      const result = await repo.getSlotById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("Slot not found");
      } else {
        return result;
      }
    },
  );

  web_server.get<{ Params: { id: number } }>(
    "/timeslots/user/:id",
    { schema: { params: z.object({ id: z.coerce.number() }) } },
    async (req) => {
      const user = await repo.getUserById(req.params.id);
      const result = await repo.getUserSlots(req.params.id);
      if (user.length === 0) {
        throw new NotFoundError("User not found");
      } else if (result.length === 0) {
        throw new NotFoundError("No slots from your schedule has been booked by someone");
      } else {
        return result;
      }
    },
  );

  web_server.get(
    "/timeslots/user",
    async (req) => {
      if (!req.claims) {
        throw new NotFoundError("You're not connected");
      }
      const current = await repo.getAuthByEmail(req.claims.sub);
      const result = await repo.getUserSlots(current[0].id_user);
      if (current.length === 0) {
        throw new NotFoundError("You're not connected");
      } else if (result.length === 0) {
        throw new NotFoundError("No slots from your schedule has been booked by someone");
      } else {
        return result;
      }
    },
  );

  web_server.post<{ Body: slots.InputSlot }>(
    "/timeslots",
    {
      schema: { body: slots.ZOmitSlot },
    },
    async (req, res) => {
      if (
        req.body.start_date < req.body.end_date
      ) {
        await repo.addSlot(req.body);
        res.code(201);
      } else {
        throw new DateError("Dates must be coherent");
      }
    },
  );

  web_server.put<{ Params: { id: number }; Body: slots.PartialSlot }>(
    "/timeslots/:id",
    {
      schema: {
        params: z.object({ id: z.coerce.number() }),
        body: slots.ZPartialSlot,
      }
    },
    async (req, res) => {
      const slot = await repo.getSlotById(req.params.id);
      if (slot.length === 0) {
        throw new NotFoundError("Slot not found");
      }
      const current_user = await repo.getAuthByEmail(req.claims.sub);
      if (slot[0].id_user !== current_user[0].id_user) {
        throw new RoleOnly("You are not allowed to do this action");
      }
      const newStart = req.body.start_date ?? slot[0].start_date;
      const newEnd = req.body.end_date ?? slot[0].end_date; 
      if (newStart >= newEnd) {
        throw new DateError("The start date must be before the end date");
      }
      await repo.editSlot(req.params.id, current_user[0].id_user, req.body);
      res.code(204);
    },
  );

  web_server.delete<{ Params: { id: number } }>(
    "/timeslots/:id",
    {
      schema: { params: z.object({ id: z.coerce.number() }) },
    },
    async (req, res) => {
      const result = await repo.getSlotById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("Slot not found");
      } else {
        await repo.deleteSlot(req.params.id);
        res.code(204);
      }
    },
  );

  web_server.get("/linktree", async () => {
    const result = await repo.getLinktree();
    return result;
  });

  web_server.get<{ Params: { id: number } }>(
    "/linktree/:id",
    { schema: { params: z.object({ id: z.coerce.number() }) } },
    async (req) => {
      const result = await repo.getLinktreeById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("Linktree not found");
      } else {
        return result;
      }
    },
  );

  web_server.get<{ Params: { id: number } }>(
    "/linktree/user/:id",
    { schema: { params: z.object({ id: z.coerce.number() }) } },
    async (req) => {
      const user = await repo.getUserById(req.params.id);
      const result = await repo.getUserLinktree(req.params.id);
      if (user.length === 0) {
        throw new NotFoundError("User not found");
      } else if (result.length === 0) {
        throw new NotFoundError("You have no link to your linktree");
      } else {
        return result;
      }
    },
  );

  web_server.get(
    "/linktree/user",
    async (req) => {
      if (!req.claims) {
        throw new NotFoundError("You're not connected");
      }
      const current = await repo.getAuthByEmail(req.claims.sub);
      const result = await repo.getUserLinktree(current[0].id_user);
      if (current.length === 0) {
        throw new NotFoundError("User not found");
      } else if (result.length === 0) {
        throw new NotFoundError("You have no link to your linktree");
      } else {
        return result;
      }
    },
  );

  web_server.post<{ Body: linktree.InputLink }>(
    "/linktree",
    {
      schema: { body: linktree.ZOmitLink },
    },
    async (req, res) => {
        if (!req.claims) {
          throw new NotFoundError("You're not connected");
        }
        const current_user = await repo.getAuthByEmail(req.claims.sub);
        await repo.addLinktree(current_user[0].id_user, req.body);
        res.code(201);
    },
  );

  web_server.put<{ Params: { id: number }; Body: linktree.PartialLink }>(
    "/linktree/:id",
    {
      schema: {
        params: z.object({ id: z.coerce.number() }),
        body: linktree.ZPartialLink,
      }
    },
    async (req, res) => {
      const linktree = await repo.getLinktreeById(req.params.id);
      if (linktree.length === 0) {
        throw new NotFoundError("link not found");
      }
      const current_user = await repo.getAuthByEmail(req.claims.sub);
      if (linktree[0].id_user !== current_user[0].id_user) {
        throw new RoleOnly("You are not allowed to do this action");
      }
      await repo.editLinktree(req.params.id, current_user[0].id_user, req.body);
      res.code(204);
    },
  );

  web_server.delete<{ Params: { id: number } }>(
    "/linktree/:id",
    {
      schema: { params: z.object({ id: z.coerce.number() }) },
    },
    async (req, res) => {
      const result = await repo.getLinktreeById(req.params.id);
      if (result.length === 0) {
        throw new NotFoundError("linktree not found");
      } else {
        await repo.deleteLinktreeById(req.params.id);
        res.code(204);
      }
    },
  );

  web_server.listen({ port: 1234, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`listening on ${address}`);
    }
  });
}

start_web_server();
