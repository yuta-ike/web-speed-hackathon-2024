import { useRef } from 'react';
import { useAsync } from 'react-use';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

type Props = {
  pageImageId: string;
};

// TODO: Intersection Observer
export const ComicViewerPage = ({ pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useAsync(async () => {
    try {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      const src = `/assets/jxl/${pageImageId}.jxl`;
      console.log(src);
      image.src = src;
      console.log('AAA');
      await image.decode().catch(console.error);
      console.log('BBB');

      const canvas = ref.current!;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      console.log('CCC');

      decrypt({
        exportCanvasContext: ctx,
        sourceImage: image,
        sourceImageInfo: {
          height: image.naturalHeight,
          width: image.naturalWidth,
        },
      });

      canvas.setAttribute('role', 'img');
    } catch (e) {
      console.log(e);
    }
  }, [pageImageId]);

  return (
    <canvas
      ref={ref}
      height={1518}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        height: '100%',
        width: 'auto',
      }}
      width={1075}
    />
  );
};
