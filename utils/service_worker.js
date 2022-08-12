// @ts-check
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
const sw =
  /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (globalThis);
console.log(sw.location);
