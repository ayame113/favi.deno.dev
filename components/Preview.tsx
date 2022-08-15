/** @jsxFrag Fragment */
/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";

interface PreviewProps extends h.JSX.HTMLAttributes<HTMLDivElement> {
  faviconUrl: string;
}

export function Preview(props: PreviewProps) {
  return (
    <>
      <PreviewInner {...props} img="/preview.png" />
      <PreviewInner {...props} img="/preview_dark.png" />
    </>
  );
}

export function PreviewInner(props: PreviewProps & { img: string }) {
  return (
    <div
      {...props}
      class={(props.class ? `${props.class} ` : "") +
        tw`overflow-x-hidden relative h-[80px] border border-gray-400 my-2`}
    >
      <img
        src={props.img}
        alt="preview"
        class={tw`absolute max-w-none h-full left-0 top-0`}
      />
      <img
        src={props.faviconUrl}
        alt="favicon"
        class={tw`absolute h-[17px] top-[11px] left-[28px]`}
      />
    </div>
  );
}
