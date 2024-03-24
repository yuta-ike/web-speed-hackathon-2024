import { useCallback, useEffect, useRef } from 'react';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

type Props = {
  importable: boolean;
  index: number;
  onFinished: () => void;
  pageImageId: string;
};

// TODO: Intersection Observer
export const ComicViewerPage = ({ importable, index, onFinished, pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const hasImportedRef = useRef(false);

  const importImage = useCallback(async () => {
    if (hasImportedRef.current) {
      return;
    }

    try {
      hasImportedRef.current = true;
      const image = new Image();
      image.crossOrigin = 'anonymous';
      const src = `/assets/jxl/${pageImageId}.jxl`;
      console.log(src);
      image.src = src;
      if (index < 3) {
        image.fetchPriority = 'high';
      }
      console.log('AAA IMPORT: ', index);
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
      onFinished();

      canvas.setAttribute('role', 'img');
    } catch (e) {
      console.log(e);
    }
  }, [index, onFinished, pageImageId]);

  useEffect(() => {
    if (3 <= index) {
      return;
    }
    importImage();
  }, [importImage, index, pageImageId]);

  useEffect(() => {
    const canvasElm = ref.current;
    if (canvasElm == null) {
      return;
    }
    if (importable) {
      const callback = () => {
        setTimeout(() => {
          importImage();
        }, 200);
      };
      const observer = new IntersectionObserver(callback, {
        root: document.getElementById('comic-viewer-wrapper')!,
        rootMargin: '600px',
        threshold: 0,
      });
      // TODO: 暫定
      setTimeout(() => {
        observer.observe(canvasElm);
      }, 500);
      return () => {
        observer.disconnect();
      };
    }
    return;
  }, [importImage, importable, index]);

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
