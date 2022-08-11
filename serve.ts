import { serve } from "https://deno.land/std@0.151.0/http/server.ts";

import { getEmojiSVG, isEmoji } from "./src/twemoji.ts";
import { getTextSVG, svgToPng } from "./src/text.ts";

const PNG_PATTERN = new URLPattern({ pathname: "/:text.png" });

serve(async (req) => {
  const match = PNG_PATTERN.exec(req.url);
  if (match) {
    const [str] = decodeURI(match.pathname.groups.text);
    const svg = isEmoji(str) ? await getEmojiSVG(str) : getTextSVG(str);
    return new Response(await svgToPng(svg));
  }
  return new Response("200 OK");
});
