import { z } from "zod";

export const ZSlot = z
  .object({
    id_slot: z.number(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    username: z.string(),
    user_email: z.email(),
    id_user: z.number()
  })
  .strict();

export const ZPartialSlot = ZSlot.omit({id_slot: true, id_user: true}).partial().strict();
export const ZOmitSlot = ZSlot.omit({id_slot: true}).strict();

export type Slot = z.infer<typeof ZSlot>;
export type PartialSlot = z.infer<typeof ZPartialSlot>;
export type InputSlot = z.infer<typeof ZOmitSlot>;
