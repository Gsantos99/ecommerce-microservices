import { z } from "zod";

export const orderSchema = z.object({
  totalAmount: z.string()
});
