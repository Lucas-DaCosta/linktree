import { z } from "zod";

export const ZAuthUser = z
  .object({
    id_auth: z.number(),
    email: z.email(),
    password: z.string(),
    id_user: z.number(),
  })
  .strict();

export const ZPartialAuth = ZAuthUser.omit({ id_auth: true })
  .partial()
  .strict();

export const ZOmitAuth = ZAuthUser.omit({ id_auth: true }).strict();


export const ZUserAuthRegister = z
  .object({
    username: z.string(),
    description: z.string(),
    speciality: z.string(),
    avatar: z.string(),
    email: z.email(),
    password: z.string(),
  })
  .strict();

export type AuthUser = z.infer<typeof ZAuthUser>;
export type PartialAuth = z.infer<typeof ZPartialAuth>;
export type InputAuth = z.infer<typeof ZOmitAuth>;
export type UserAuthRegister = z.infer<typeof ZUserAuthRegister>;
