import { Hono } from "hono";
import { zUserValidator } from "./validator";
import { getSupabase, supabaseMiddleware } from "../middlewares/supabase";

const appUser = new Hono();
appUser.use("*", supabaseMiddleware);

/**
 * Route for query all users from supabase
 * GET /api/users
 */
appUser.get("/", async (c) => {
  const supabase = getSupabase(c);

  const { data, error } = await supabase.from("users").select("*");

  return c.json({
    data,
    error,
  });
});

/**
 * Route for register a new user in supabase
 */
appUser.post("/", zUserValidator, async (c) => {
  const body = await c.req.parseBody();
  const supabase = getSupabase(c);

  const { data, error } = await supabase.from("users").insert(body).select();

  return c.json({ data, error });
});

export { appUser };
