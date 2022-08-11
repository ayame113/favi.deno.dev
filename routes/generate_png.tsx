import { Handlers, RouteConfig } from "$fresh/server.ts";

import { getEmojiSVG, isEmoji } from "../helpers/twemoji.ts";
import { getTextSVG, svgToPng } from "../helpers/text.ts";

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
    return new Response(await svgToPng(svg, backgroundColor));
  },
};
