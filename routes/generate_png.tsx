import { Handlers, RouteConfig } from "$fresh/server.ts";

import { contentType } from "https://deno.land/std@0.152.0/media_types/mod.ts";

import { getEmojiSVG, isEmoji } from "../utils/twemoji.ts";
import { getTextSVG, svgToPng } from "../utils/text.ts";

const pngContentType = contentType(".png");
const cache: Record<string, Uint8Array | undefined> = {};

export const config: RouteConfig = {
  routeOverride: "/:text.png",
};

export const handler: Handlers = {
  async GET(req, { params: { text } }) {
    const { searchParams } = new URL(req.url);
    const [str] = decodeURI(text);
    const backgroundColor = searchParams.get("backgroundColor") || undefined;
    const color = searchParams.get("color") ?? "black";
    const cacheKey = `${str}_${color}_${backgroundColor}`;
    if (!cache[cacheKey]) {
      const svg = isEmoji(str)
        ? await getEmojiSVG(str)
        : getTextSVG(str, color);
      cache[cacheKey] = await svgToPng(svg, backgroundColor);
    }
    return new Response(cache[cacheKey], {
      headers: {
        "Content-Type": pngContentType,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  },
};
