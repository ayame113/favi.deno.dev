/** @jsxFrag Fragment */
/** @jsx h */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import { Tab } from "../components/Tab.tsx";

export default function Counter() {
  return (
    <>
      <Tab>
        <div title="タブ1">これはタブ1の内容です</div>
        <div title="タブ2">これはタブ2の内容です</div>
        <div title="タブ3">これはタブ3の内容です</div>
        <div title="タブ4">これはタブ4の内容です</div>
      </Tab>
    </>
  );
}
