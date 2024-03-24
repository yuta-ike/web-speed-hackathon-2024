/// <reference types="@types/serviceworker" />
import PQueue from 'p-queue';

import { jitter } from './jitter';
import { transformJpegXLToBmp } from './transformJpegXLToBmp';
import { zstdFetch as fetch } from './zstdFetch';

// ServiceWorker が負荷で落ちないように並列リクエスト数を制限する
const queue = new PQueue({
  concurrency: 5,
});

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  console.log('[service worker] ACTIVE!!!!!!!!!!!!!!!!!!!!');
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (ev: FetchEvent) => {
  if (!ev.request.url.endsWith('format=jxl')) {
    ev.respondWith(fetch(ev.request));
  } else {
    console.log('[service worker] FETCH::::::::::::::::::::::::');
    console.log(ev);
    ev.respondWith(
      queue.add(() => onFetch(ev.request), {
        throwOnTimeout: true,
      }),
    );
  }
});

async function onFetch(request: Request): Promise<Response> {
  // サーバーの負荷を分散するために Jitter 処理をいれる
  await jitter();

  const res = await fetch(request);
  console.log(res);
  return transformJpegXLToBmp(res);
}
