import { Handlers } from "$fresh/server.ts";

import { contentType } from "https://deno.land/std@0.152.0/media_types/mod.ts";

export const handler: Handlers = {
  GET() {
    return new Response("", {
      headers: {
        "Content-Type": contentType(".js"),
      },
    });
  },
};
