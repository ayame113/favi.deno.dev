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
  return (
    <div>
      <div class={tw`flex gap-0.5 text-[${props.color ?? "white"}]`}>
        {children.map((v, i) => (
          <button
            onClick={() => setTab(i)}
            disabled={i === tab}
            class={tw`flex-grow rounded-t-lg p-1 transition-opacity bg-[${
              props.backgroundColor ?? "dimgray"
            }] hover:opacity-75 disabled:opacity-75`}
          >
            {v.props.title ?? i}
          </button>
        ))}
      </div>
      <div>{children[tab].props.children}</div>
    </div>
  );
}
