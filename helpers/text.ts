import { initialize, svg2png } from "https://esm.sh/svg2png-wasm@1.3.4";

const [, ...fonts] = await Promise.all([
  initialize(
    fetch("https://esm.sh/svg2png-wasm@1.3.4/svg2png_wasm_bg.wasm"),
  ),
  Deno.readFile(
    new URL("./fonts/Noto_Sans_JP/NotoSansJP-Regular.otf", import.meta.url),
  ),
]);

export const getTextSVG = (str: string, color: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dy="36%" style="text-anchor:middle;font-size:90px;" fill="${color}">${str}</text></svg>`;
export const svgToPng = (svg: string, backgroundColor?: string) =>
  svg2png(
    svg,
    {
      width: 512,
      height: 512,
      backgroundColor,
      fonts,
      defaultFontFamily: {
        sansSerifFamily: "Noto Sans JP",
      },
    },
  );
