import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  stub,
} from "https://deno.land/std@0.224.0/testing/mock.ts";

import { getEmojiSVG, isEmoji } from "./twemoji.ts";

Deno.test({
  name: "svgToPng",
  fn() {
    assertEquals(isEmoji("a"), false);
    assertEquals(isEmoji("あ"), false);
    assertEquals(isEmoji("😊"), true);
    assertEquals(isEmoji("🦕"), true);
  },
});

Deno.test({
  name: "getEmojiSVG",
  async fn() {
    const mockFetchText = "__MOCK_FETCH__";
    const fetchStub = stub(
      globalThis,
      "fetch",
      () => Promise.resolve(new Response(mockFetchText)),
    );
    try {
      assertEquals(
        await getEmojiSVG("🦕"),
        mockFetchText,
      );
      assertSpyCall(fetchStub, 0, {
        args: [
          "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f995.svg",
        ],
      });
      assertSpyCalls(fetchStub, 1);
    } finally {
      fetchStub.restore();
    }
  },
});
