import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createReporter } from "https://deno.land/x/g_a@0.1.2/mod.ts";
const ga = createReporter({ id: Deno.env.get("ANALYTICS_UA") });

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const start = performance.now();
  let err, res!: Response;
  try {
    res = await ctx.next();
    return res;
  } catch (e) {
    err = e;
    throw e;
  } finally {
    ga(req, ctx, res, start, err);
  }
}
