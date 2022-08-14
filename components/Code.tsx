/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

const colorSelectorStyle =
  "cursor-pointer border-2 px-2 py-1 my-2 mx-auto w-full block rounded-xl focus:outline-none focus-within:border-blue-500 transition-colors";

export interface Color {
  enable: boolean;
  value: string;
}

interface CodeProps extends h.JSX.HTMLAttributes<HTMLPreElement> {
  name: string;
  children: string;
}

export function Code(props: CodeProps) {
  const [isHover, setIsHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(props.children).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div
      class={tw`rounded-md border-2 border-gray relative` + " " + props.class}
    >
      <button
        class={tw`absolute right-1 bg-white border-2 px-1 m-2 w-[3.5em] shadow-md text-center rounded-xl focus:outline-none transition-[border-color,width] hover:border-[deeppink]`}
        style={{
          ...(isHover && !copied ? { borderColor: "deeppink" } : {}),
          ...(copied ? { width: "5.5em" } : {}),
        }}
        onClick={copy}
      >
        {copied ? "✅Copied" : "Copy"}
      </button>
      <div>
        <span class={tw`p-2`}>
          {props.name}
        </span>
      </div>
      <pre
        class={tw`cursor-pointer rounded-md shadow-inner bg-gray-100 overflow-x-scroll p-2`}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={copy}
      >
        {props.children}
      </pre>
    </div>
  );
}
