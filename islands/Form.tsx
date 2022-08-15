/** @jsx h */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

import { Preview } from "../components/Preview.tsx";
import { Color, ColorPicker } from "../components/ColorPicker.tsx";
import { EmojiPicker } from "../components/EmojiPicker.tsx";
import { Code } from "../components/Code.tsx";

const h3Style = `text-lg mt-5 mb-3 mx-0! border-b-2 px-2 py-1`;
const pStyle = "p-2";

export default function Form() {
  const [targetChar, setTargetChar] = useState("🍌");
  const [color, setColor] = useState<Color>({
    enable: false,
    value: "#000000",
  });
  const [backgroundColor, setBackgroundColor] = useState<Color>({
    enable: false,
    value: "#ffffff",
  });

  const [faviconUrl, headTag, manifestJson] = generateCode(
    targetChar,
    color,
    backgroundColor,
  );

  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textarea.current) {
      const l = textarea.current.value.length;
      textarea.current.focus();
      textarea.current.setSelectionRange(l, l);
    }
  }, []);

  return (
    <div class={tw`children:(mx-2)`}>
      <Head>
        <style>
          {`em-emoji-picker {
              --font-size: 0.6em;
              height: 40vh;
              min-hight: 200px;
              max-hight: 300px;
              width: 100%;
            }`}
        </style>
      </Head>
      <h3 class={tw(h3Style)}>
        1. Select the text you want for your favicon.
      </h3>
      <p class={tw(pStyle)}>
        Type in the text box on the left or select from the emoji picker on the
        right.
      </p>
      <div class={tw`flex flex-wrap items-stretch`}>
        <div class={tw`flex-grow min-w-[200px]`}>
          <textarea
            autofocus
            title="Enter the characters you want to make into a favicon."
            class={tw`w-full h-full text-lg bg-gray-100 focus:(bg-white border-blue-500 border-2) rounded-xl outline-none`}
            onInput={(e) =>
              e.currentTarget.value.length &&
              setTargetChar(first(e.currentTarget.value))}
            ref={textarea}
          >
            {targetChar}
          </textarea>
        </div>
        <EmojiPicker
          class={tw`mx-auto w-full max-w-[355px]`}
          onEmojiSelect={(v) =>
            setTargetChar(
              String.fromCodePoint(Number.parseInt(v.unified, 16)),
            )}
        />
      </div>
      <h3 class={tw(h3Style)}>
        2. Select Color
      </h3>
      <p class={tw(pStyle)}>
        Choose your text color and background color so that it works in both
        light and dark modes.
      </p>
      <ColorPicker
        color={color}
        setColor={setColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <h3 class={tw(h3Style)}>
        3. Check the preview
      </h3>
      <p class={tw(pStyle)}>Check if the favicon is displayed as expected.</p>
      <Preview faviconUrl={faviconUrl} />
      <h3 class={tw(h3Style)}>
        4. Copy the source code and paste it on your website!
      </h3>
      <p class={tw(pStyle)}>
        Add the favicon information in the html head tag and you're done.
      </p>
      <Code name="index.html" class={tw`my-4`}>{headTag}</Code>
      <Code name="manifest.json" class={tw`my-4`}>{manifestJson}</Code>
    </div>
  );
}

function generateCode(
  targetChar: string,
  color: Color,
  backgroundColor: Color,
) {
  const searchParams = new URLSearchParams();
  if (color.enable) {
    searchParams.set("color", color.value);
  }
  if (backgroundColor.enable) {
    searchParams.set("backgroundColor", backgroundColor.value);
  }
  const searchParamsText = searchParams.toString();
  const faviconUrl = `https://favi.deno.dev/${targetChar}.png${
    searchParamsText && "?"
  }${searchParamsText}`;
  return [
    faviconUrl,
    `<head>
  <!-- Copyright 2018 Twitter, Inc and other contributors. Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/ -->
  <link rel="icon" type="image/png" href="${faviconUrl}" />
  <link rel="apple-touch-icon" href="${faviconUrl}" />
  <link rel="manifest" href="/manifest.json" />
</head>`,
    `{
  "icons": [{
    "src": "${faviconUrl}",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any maskable"
  }]
}`,
  ];
}

function first(str: string) {
  return str[Symbol.iterator]().next().value;
}
