import path from 'path-browserify';

import { getEnv } from '@wsh-2024/app/src/lib/env/getEnv';

async function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function preloadImages() {
  if (getEnv('PATH_LIST', '/') == null) {
    return;
  }

  const imagePathList: string[] = (getEnv('PATH_LIST', '/') as string).split(',').filter((imagePath) => {
    const extension = path.parse(imagePath).ext.toLowerCase();
    return ['.bmp', '.jpg', '.jpeg', '.gif', '.png', '.webp', '.avif'].includes(extension);
  });

  const prefetch = Promise.all(
    imagePathList.map((imagePath) => {
      return new Promise((resolve) => {
        const link = document.createElement('link');

        Object.assign(link, {
          as: 'image',
          crossOrigin: 'anonymous',
          fetchPriority: 'high',
          href: imagePath,
          onerror: resolve,
          onload: resolve,
          rel: 'preload',
        });
        document.head.appendChild(link);
      });
    }),
  );

  await Promise.race([prefetch, wait(5000)]);
}
