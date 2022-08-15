import { Handlers } from "$fresh/server.ts";

import {
  DESCRIPTION,
  FAVICON_URL,
  THEME_COLOR,
  TITLE,
} from "../utils/metadata.ts";

export const handler: Handlers = {
  GET() {
    return Response.json({
      name: TITLE,
      short_name: TITLE,
      description: DESCRIPTION,
      display: "minimal-ui",
      icons: [{
        src: FAVICON_URL,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      }],
      start_url: "/",
      theme_color: THEME_COLOR,
      background_color: THEME_COLOR,
    }, {
      headers: {
        "cache-control": "public, max-age=31536000",
      },
    });
  },
};
