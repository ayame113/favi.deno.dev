import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  stub,
} from "https://deno.land/std@0.152.0/testing/mock.ts";

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
        args: ["https://twemoji.maxcdn.com/v/latest/svg/1f995.svg"],
      });
      assertSpyCalls(fetchStub, 1);
    } finally {
      fetchStub.restore();
    }
  },
});
