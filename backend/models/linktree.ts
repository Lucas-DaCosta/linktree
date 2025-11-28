import { z } from "zod";

export const Zlinktree = z
  .object({
    id_link: z.number(),
    name: z.string(),
    logo: z.string(),
    url: z.url(),
    id_user: z.number()
  })
  .strict();

export const ZPartialLink = Zlinktree.omit({id_link: true, id_user: true}).partial().strict();
export const ZOmitLink = Zlinktree.omit({id_link: true, id_user: true}).strict();

export type Linktree = z.infer<typeof Zlinktree>;
export type PartialLink = z.infer<typeof ZPartialLink>;
export type InputLink = z.infer<typeof ZOmitLink>;
