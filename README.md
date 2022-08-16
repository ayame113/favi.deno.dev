# favi.deno.dev

[![codecov](https://codecov.io/gh/ayame113/favi.deno.dev/branch/main/graph/badge.svg?token=PGCarfD0tb)](https://codecov.io/gh/ayame113/favi.deno.dev)

Source code for [favi.deno.dev](https://favi.deno.dev).

API to provide images for favicons using emojis and characters.

### develop

```shell
> deno task start
```

### How it works

```mermaid
graph LR
    A[Your Website] --> B[favi.deno.dev <br><br> Convert SVG to PNG] --> C["twemoji.maxcdn.com"]
    C --Get emoji SVG--> B --provide PNG favicon--> A
```

- When accessed for the first time, a response is returned from CDN Edge (deno
  deploy). ─ about 300ms
- For the second and subsequent accesses, a response will be returned from the
  service worker. ─ about 100ms

![lighthouse](./lighthouse.png)
