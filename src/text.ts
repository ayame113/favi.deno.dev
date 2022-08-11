import { initialize, svg2png } from "https://esm.sh/svg2png-wasm@1.3.4";

const [, ...fonts] = await Promise.all([
  initialize(
    fetch("https://esm.sh/svg2png-wasm@1.3.4/svg2png_wasm_bg.wasm"),
  ),
  Deno.readFile("./fonts/Noto_Sans_JP/NotoSansJP-Regular.otf"),
]);

export const getTextSVG = (str: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" style="dominant-baseline:central;text-anchor:middle;font-size:90px;" fill="red">${str}</text></svg>`;
export const svgToPng = (svg: string) =>
  svg2png(
    svg,
    {
      // width: 400,
      // height: 400,
      // backgroundColor: "white",
      fonts,
      defaultFontFamily: {
        sansSerifFamily: "Noto Sans JP",
      },
    },
  );
