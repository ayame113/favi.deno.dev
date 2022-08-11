import { serve } from "https://deno.land/std@0.145.0/http/server.ts";

import { initialize, svg2png } from "https://esm.sh/svg2png-wasm@1.3.4";

await initialize(
    fetch("https://esm.sh/svg2png-wasm@1.3.4/svg2png_wasm_bg.wasm"),
);

const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<text x="50%" y="50%" style="dominant-baseline:central;text-anchor:middle;font-size:90px;" fill="red">
  あ
</text>
</svg>`;

// Deno.writeTextFileSync("./output.svg", svg);

const png = await svg2png(
    svg,
    {
        // scale: 2, // optional
        // width: 400, // optional
        // height: 400, // optional
        backgroundColor: "black", // optional
        fonts: [
            Deno.readFileSync("./Kosugi/Kosugi-Regular.ttf"),
            //   // optional
            //   // Deno.readFileSync("./Roboto.ttf"), // require, If you use text in svg
        ],
        defaultFontFamily: {
            // optional
            sansSerifFamily: "Kosugi",
        },
    },
);
serve((req: Request) => new Response(png));
