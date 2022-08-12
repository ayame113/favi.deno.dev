/** @jsxFrag Fragment */
/** @jsx h */
import { Fragment, h } from "preact";
import Counter from "../islands/Counter.tsx";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

import {
  DESCRIPTION,
  FAVICON_URL,
  THEME_COLOR,
  TITLE,
} from "../utils/metadata.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://favi.deno.dev" />
        <meta property="og:image" content={FAVICON_URL} />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
        <link rel="apple-touch-icon" href={FAVICON_URL} />
        <link rel="manifest" href="/manifest.json" />
        <script type="module">
          if ('serviceWorker' in navigator)
          navigator.serviceWorker.register('service_worker.js')
        </script>
      </Head>
      <header>fast favicon</header>
      <main>
        <div>
          <h2 class={tw`text-3xl text-center`}>fast favicon</h2>
          Don't want to worry about setting favicons? Tired of favicon
          generation and hosting? Wishes can come true.
        </div>
        <div>
          <h2 class={tw`text-3xl text-center`}>Usage</h2>
          1. Select the text you want for your favicon.
          <Counter />
        </div>
      </main>
      <footer></footer>
    </>
  );
}
