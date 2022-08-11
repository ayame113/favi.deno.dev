import regexp from "https://esm.sh/twemoji-parser@14.0.0/dist/lib/regex.js";
const emojiRgexp: RegExp = regexp;

export const isEmoji = (str: string) => emojiRgexp.test(str);
export const getEmojiSVG = (str: string) =>
  fetch(getEmojiURL(str)).then((res) => res.text());
const getEmojiURL = (str: string) =>
  `https://twemoji.maxcdn.com/v/latest/svg/${
    str.codePointAt(0)?.toString(16)
  }.svg`;
