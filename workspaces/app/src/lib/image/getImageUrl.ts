import { getEnv } from '../env/getEnv';

type Params = {
  format: 'avif' | 'webp' | 'png' | 'jpg' | 'jxl';
  height?: number;
  imageId: string;
  width?: number;
};

export function getImageUrl({ format, imageId }: Params): string {
  console.log(getEnv('API_URL'));
  const url = new URL(`/images/${imageId}`, getEnv('API_URL', window.location.href));

  url.searchParams.set('format', format);
  return url.href;
}
