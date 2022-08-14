/** @jsxFrag Fragment */
/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { asset, Head } from "$fresh/runtime.ts";

import { Link } from "../components/Link.tsx";
import Form from "../islands/Form.tsx";

import {
  DESCRIPTION,
  FAVICON_URL,
  THEME_COLOR,
  TITLE,
} from "../utils/metadata.ts";

const mainDivClass =
  apply`mt-4 bg-gray-50 rounded-lg p-2 shadow-md max-w-4xl mx-auto`;
const h2Style = apply`text-3xl text-center border-b-2 p-1`;
const h3Style = apply`text-lg my-3`;
const ulStyle = apply`list-disc p-2 pl-8`;

export default function Home() {
  return (
    <body class={tw`min-h-screen flex flex-col`}>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://favi.deno.dev" />
        <meta property="og:image" content={FAVICON_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_ayame113_" />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
        <link rel="apple-touch-icon" href={FAVICON_URL} />
        <link rel="manifest" href="/manifest.json" />
        <script type="module">
          if ('serviceWorker' in navigator)
          navigator.serviceWorker.register('{asset("/service_worker.js")}')
        </script>
      </Head>
      <header class={tw`text-lg border-t-2 border-black p-1`}>
        <a href="/" class={tw`block`}>
          <span class={tw`text-2xl italic`}>fast favicon</span>{" "}
          - API to provide images for favicons using emojis and characters.
        </a>
      </header>
      <main class={tw`bg-gray-200 p-4 shadow-inner flex-grow`}>
        <div class={tw(mainDivClass, "mt-0")}>
          <h2 class={tw(h2Style)}>
            <img src="/🍌.png" alt="favicon" class={tw`inline w-8 h-8`} />
            {" fast favicon "}
            <img src="/🍒.png" alt="favicon" class={tw`inline w-8 h-8`} />
          </h2>
          <p class={tw`p-2`}>
            Don't want to worry about setting favicons? Tired of favicon
            generation and hosting? Wishes can come true.
          </p>
          <hr class={tw`border-gray-200 border-t-2`} />
          <ul class={tw(ulStyle)}>
            <li>
              API to provide images for favicons using emojis and characters.
            </li>
            <li>Completely free.</li>
            <li>Generate emoji favicons using twemoji.</li>
            <li>Also supports any non-emoji character.</li>
          </ul>
        </div>
        <div class={tw(mainDivClass)}>
          <h2 class={tw(h2Style)}>Usage</h2>
          <Form />
        </div>
        <div class={tw(mainDivClass)}>
          <h2 class={tw(h2Style)}>Note</h2>
          <h3 class={tw(h3Style)}>License notation</h3>
          <ul class={tw(ulStyle)}>
            <li>
              If you use emoji favicon with this service, you need a license
              notation for{" "}
              <Link href="https://twemoji.twitter.com/">twemoji</Link>, the
              provider of the emoji image.
            </li>
          </ul>
        </div>
        <div class={tw(mainDivClass)}>
          <h2 class={tw(h2Style)}>License</h2>
          <ul class={tw(ulStyle)}>
            <li>
              <Link href="https://twemoji.twitter.com/">Twemoji</Link>
              {" - "}
              <Link href="https://creativecommons.org/licenses/by/4.0/">
                CC-BY 4.0
              </Link>
            </li>
            <li>
              <Link href="https://fonts.google.com/noto/specimen/Noto+Sans+JP">
                "Noto Sans"
              </Link>{" "}
              is lisenced under the{" "}
              <Link href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL">
                SIL Open Font License 1.1
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <footer class={tw`py-1 text-center text-gray-500`}>
        Copyright © 2022{" "}
        <Link href="https://github.com/ayame113/">
          ayame113
        </Link>.{" | "}
        <Link href="https://github.com/ayame113/favi.deno.dev">
          source
        </Link>
      </footer>
    </body>
  );
}
