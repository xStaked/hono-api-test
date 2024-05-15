import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Context, MiddlewareHandler } from "hono";

export const idCtxSupase = "supabase-ctx";

/**
 * Middleware to create a supabase client and set it in the context
 * @param c
 * @param next
 */
export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    if (!c.env.SUPABASE_URL) {
      return c.json({ error: "SUPABASE_URL not found" }, 500);
    }

    if (!c.env.SUPABASE_KEY) {
      return c.json({ error: "SUPABASE_KEY not found" }, 500);
    }

    const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
    c.set(idCtxSupase, supabase);
    await next();
  } catch (error: any) {
    return c.text(error.message);
  }
};

/**
 *  Get the supabase client from the context
 * @param c
 * @returns
 */
export const getSupabase = (c: Context): SupabaseClient => c.get(idCtxSupase);
