import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

/**
 * name:string
 * email:string
 */

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const zUserValidator = zValidator("form", userSchema);
