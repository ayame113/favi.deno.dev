import { Handlers, RouteConfig } from "$fresh/server.ts";

import { contentType } from "https://deno.land/std@0.152.0/media_types/mod.ts";

import { getEmojiSVG, isEmoji } from "../utils/twemoji.ts";
import { getTextSVG, svgToPng } from "../utils/text.ts";

const pngContentType = contentType(".png");

export const config: RouteConfig = {
  routeOverride: "/:text.png",
};

export const handler: Handlers = {
  async GET(req, { params: { text } }) {
    const { searchParams } = new URL(req.url);
    const [str] = decodeURI(text);
    const backgroundColor = searchParams.get("backgroundColor") || undefined;
    const color = searchParams.get("color") ?? "black";
    const svg = isEmoji(str) ? await getEmojiSVG(str) : getTextSVG(str, color);
    return new Response(await svgToPng(svg, backgroundColor), {
      headers: {
        "Content-Type": pngContentType,
      },
    });
  },
};
