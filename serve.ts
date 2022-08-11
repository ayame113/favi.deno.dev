import { serve } from "https://deno.land/std@0.151.0/http/server.ts";

import { getEmojiSVG, isEmoji } from "./src/twemoji.ts";
import { getTextSVG, svgToPng } from "./src/text.ts";

serve(async (req) => {
  const { searchParams } = new URL(req.url);
  const [str] = searchParams.get("char") ?? "🦕";
  const svg = isEmoji(str) ? await getEmojiSVG(str) : getTextSVG(str);
  return new Response(await svgToPng(svg));
});
