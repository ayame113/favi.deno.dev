import { serve } from "https://deno.land/std@0.151.0/http/server.ts";

import { getEmojiSVG, isEmoji } from "./src/twemoji.ts";
import { getTextSVG, svgToPng } from "./src/text.ts";

const PNG_PATTERN = new URLPattern({ pathname: "/:text.png" });

serve(async (req) => {
  const { searchParams } = new URL(req.url);
  const match = PNG_PATTERN.exec(req.url);
  if (match) {
    const [str] = decodeURI(match.pathname.groups.text);
    const backgroundColor = searchParams.get("backgroundColor") || undefined;
    const color = searchParams.get("color") ?? "black";
    const svg = isEmoji(str) ? await getEmojiSVG(str) : getTextSVG(str, color);
    return new Response(await svgToPng(svg, backgroundColor));
  }
  return new Response("200 OK");
});
