import { assertEquals } from "https://deno.land/std@0.220.1/testing/asserts.ts";

import { getTextSVG, svgToPng } from "./text.ts";

Deno.test({
  name: "svgToPng",
  async fn() {
    const svg = getTextSVG("a", "red");
    const png = await svgToPng(svg);
    assertEquals(
      png,
      Deno.readFileSync(new URL(import.meta.resolve("./testdata/a.png"))),
    );
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
