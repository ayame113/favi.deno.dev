import { Handlers } from "$fresh/server.ts";

import { contentType } from "https://deno.land/std@0.173.0/media_types/mod.ts";

export const handler: Handlers = {
  async GET() {
    return new Response(
      (await Deno.open(
        new URL(import.meta.resolve("../static/service_worker.js")),
      )).readable,
      {
        headers: {
          "Content-Type": contentType(".js"),
        },
      },
    );
  },
};
