// @ts-check
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
const sw =
  /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (globalThis);

const FOURCE_CACHE = ["/"];
const EXCLUDE_CACHE = new Set(["/_frsh/refresh.js"]);
const CACHE_KEY = location.href;
const cachePromise = caches.open(CACHE_KEY);
const isDevelop = location.hostname === "localhost";

sw.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    console.log(
      `🍌[[[install]]] (isDevelop: ${isDevelop}, version: "${location.search}")`,
    );
    await sw.skipWaiting();
    const cache = await cachePromise;
    await cache.addAll(FOURCE_CACHE);
  })());
});

sw.addEventListener("activate", (e) => {
  console.log(`🍌[[[activate]]]`);
  e.waitUntil((async () => {
    await sw.clients.claim();
    const keys = await caches.keys();
    await Promise
      .all(keys.map((key) => key !== CACHE_KEY && caches.delete(key)));
  })());
});

sw.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    if (isDevelop && new URL(e.request.url).pathname === "/_frsh/refresh.js") {
      const fetchResponse = await fetch(e.request);
      let code = await fetchResponse.text();
      code = code.replace(
        `new EventSource("/_frsh/alive").addEventListener("message", (e) => { if (e.data !== buildId && !reloading) { reloading = true; location.reload(); } });`,
        `const e = new EventSource("/_frsh/alive"); e.addEventListener("message", (e) => { clearTimeout(reloadTimeout); if (e.data !== buildId && !reloading) { reloading = true; location.reload(); } reloadTimeout = setTimeout(() => { reloading = true; location.reload(); }, 2000); });`,
      );
      code = `let reloadTimeout; ${code}`;
      return new Response(code, { headers: fetchResponse.headers });
    }

    const cache = await cachePromise;
    const cacheResponse = await cache.match(e.request);
    if (cacheResponse && !isDevelop) {
      queueMicrotask(async () => {
        if (navigator.onLine) {
          await cache.add(e.request);
        }
      });
      return cacheResponse;
    }
    const fetchResponse = await fetch(e.request);
    if (shouldCache(fetchResponse)) {
      cache.put(e.request, fetchResponse.clone());
    }
    return fetchResponse;
  })());
});

/** @param  {Response} response */
function shouldCache(response) {
  if (!response.ok) {
    return false;
  }
  if (EXCLUDE_CACHE.has(new URL(response.url).pathname)) {
    return false;
  }
  const contentType = response.headers.get("content-type")?.toLowerCase();
  if (!contentType) {
    return false;
  }
  return contentType.includes("text/html") ||
    contentType.includes("text/css") ||
    contentType.includes("application/javascript");
}
