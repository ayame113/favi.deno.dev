/** @jsx h */
import { h, VNode } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

export interface TabChildProps {
  title?: string;
}
export interface TabProps {
  children: VNode<TabChildProps> | VNode<TabChildProps>[];
  color?: string;
  backgroundColor?: string;
}

export function Tab(props: TabProps) {
  const [tab, setTab] = useState(0);
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const { backgroundColor = "#333333" } = props;
  return (
    <div>
      <div
        class={tw`flex flex-nowrap gap-x-0.5 text-[${
          props.color ?? "white"
        }] border-b-4 border-[${backgroundColor}]`}
      >
        {children.map((v, i) => (
          <button
            onClick={() => setTab(i)}
            disabled={i === tab}
            class={tw`flex-grow rounded-t-lg p-1 transition-opacity bg-[${backgroundColor}] opacity-80 hover:opacity-100 disabled:opacity-100`}
          >
            {v.props.title ?? i}
          </button>
        ))}
      </div>
      <div>{children[tab].props.children}</div>
    </div>
  );
}
