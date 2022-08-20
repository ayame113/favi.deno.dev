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
  apply`mt-4 bg-white rounded-lg p-2 shadow-md max-w-4xl mx-auto`;
const h2Style = apply`text-3xl text-center border-b-2 p-1`;
const h3Style = apply`text-lg mt-4 mb-3 border-b-2 px-2 py-1`;
const ulStyle = apply`list-disc p-2 pl-8`;
const pStyle = "p-2";

export default function Home() {
  return (
    <body class={tw`min-h-screen flex flex-col`}>
      <Head>
        <meta content="text/html; charset=UTF-8" name="Content-Type" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://favi.deno.dev" />
        <meta property="og:image" content="/%F0%9F%8D%8C.png" />
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
          <p class={tw(pStyle)}>
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
          <h3 class={tw(h3Style)}>Dependencies</h3>
          <ul class={tw(ulStyle)}>
            <li>
              This site is hosted at{" "}
              <Link href="https://deno.com/deploy">deno deploy</Link>.
            </li>
            <li>
              Using <Link href="https://fresh.deno.dev/">fresh</Link>{" "}
              as framework.
            </li>
            <li>
              Emoji images are taken from{" "}
              <Link href="https://twemoji.maxcdn.com/" />.
            </li>
            <li>
              <Link href="https://github.com/ssssota/svg2png-wasm">
                ssssota/svg2png-wasm
              </Link>{" "}
              is used to convert from svg to png.
            </li>
            <li>
              <Link href="https://github.com/missive/emoji-mart">
                missive/emoji-mart
              </Link>{" "}
              is used for the emoji picker.
            </li>
          </ul>
          <h3 class={tw(h3Style)}>Sponsor</h3>
          <p class={tw(pStyle)}>
            Want to support this project? Support me via GitHub Sponsers!
            <iframe
              src="https://github.com/sponsors/ayame113/button"
              title="Sponsor ayame113"
              height="35"
              width="116"
              style="border: 0;"
            >
            </iframe>
          </p>
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
