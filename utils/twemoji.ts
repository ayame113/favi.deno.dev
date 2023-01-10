import regexp from "https://esm.sh/twemoji-parser@14.0.0/dist/lib/regex.js";
const emojiRgexp: RegExp = regexp;

export const isEmoji = (str: string) => (
  emojiRgexp.lastIndex = 0, emojiRgexp.test(str)
);
export const getEmojiSVG = async (str: string) =>
  (await fetch(getEmojiURL(str))).text();
const getEmojiURL = (str: string) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${
    getCodePoint(str)
  }.svg`;
const getCodePoint = (str: string) => str.codePointAt(0)?.toString(16);
