/** @jsxFrag Fragment */
/** @jsx h */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { apply, tw } from "@twind";

import { Tab } from "../components/Tab.tsx";
import { EmojiPicker } from "../components/EmojiPicker.tsx";

const h3Style = apply`text-lg my-3`;

export default function Form() {
  const [targetChar, setTargetChar] = useState("🍌");
  const [headTag, manifestJson] = generateCode(targetChar);

  return (
    <div class={tw`children:(m-2)`}>
      <h3 class={tw(h3Style)}>
        1. Select the text you want for your favicon.
      </h3>
      <Tab>
        <div title="Select from keyboard">
          <textarea
            autofocus
            title="Enter the characters you want to make into a favicon."
            class={tw`w-full my-3 text-lg border`}
            onInput={(e) =>
              e.currentTarget.value.length &&
              setTargetChar(first(e.currentTarget.value))}
          >
            {targetChar}
          </textarea>
        </div>
        <div title="Select from emoji list">
          <EmojiPicker
            onEmojiSelect={(v) =>
              setTargetChar(
                String.fromCodePoint(Number.parseInt(v.unified, 16)),
              )}
          />
        </div>
      </Tab>
      <h3 class={tw(h3Style)}>
        2. Check the preview.
      </h3>
      <img src={`/${targetChar}.png`} alt="favicon" class={tw`w-8 h-8`} />
      <h3 class={tw(h3Style)}>
        3. Copy the source code and paste it on your website!
      </h3>
      <pre
        class={tw`rounded-md border-2 border-gray shadow-inner bg-gray-100 overflow-x-scroll p-2`}
      >
        {headTag}
      </pre>
      <pre
        class={tw`rounded-md border-2 border-gray shadow-inner bg-gray-100 overflow-x-scroll p-2`}
      >
        {manifestJson}
      </pre>
    </div>
  );
}

function generateCode(targetChar: string) {
  const favicon = `https://favi.deno.dev/${targetChar}.png`;
  return [
    `<head>
  <!-- Copyright 2018 Twitter, Inc and other contributors. Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/ -->
  <link rel="icon" type="image/png" href="${favicon}" />
  <link rel="apple-touch-icon" href="${favicon}" />
  <link rel="manifest" href="/manifest.json" />
</head>`,
    `{
  "icons": [{
    "src": "${favicon}",
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
