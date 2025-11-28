import { z } from "zod";

export const ZUsers = z
  .object({
    id_user: z.number(),
    username: z.string(),
    description: z.string(),
    speciality: z.string(),
    avatar: z.string()
  })
  .strict();

export const ZPartialUsers = ZUsers.omit({ id_user: true }).partial().strict();
export const ZOmitUsers = ZUsers.omit({ id_user: true }).strict();

export type User = z.infer<typeof ZUsers>;
export type PartialUser = z.infer<typeof ZPartialUsers>;
export type InputUser = z.infer<typeof ZOmitUsers>;
