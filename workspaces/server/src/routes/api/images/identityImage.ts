import path from 'node:path';

import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Magika } from 'magika';

import { PostImageRequestBodySchema } from '@wsh-2024/schema/src/api/images/PostImageRequestBody';

import { authMiddleware } from '../../../middlewares/authMiddleware';

const SUPPORTED_MAGIKA_LABEL_LIST = ['bmp', 'jpeg', 'png', 'webp'];
const SUPPORTED_MIME_TYPE_LIST = ['image/bmp', 'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jxl'];

const magika = new Magika();

const initMagikaPromise = magika.load({
  configPath: path.resolve(process.cwd(), './magika/config.json'),
  modelPath: path.resolve(process.cwd(), './magika/model.json'),
});

const app = new OpenAPIHono();

const route = createRoute({
  method: 'post',
  path: '/api/v1/identity-image',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: PostImageRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
          }),
        },
      },
      description: 'Create image.',
    },
  },
  tags: ['[Admin] Images API'],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const formData = c.req.valid('form');
  const file = formData.content;
  const fileTypeFromBuffer = (await import('file-type')).fileTypeFromBuffer;

  await initMagikaPromise;
  const prediction = await magika.identifyBytes(new Uint8Array(await file.arrayBuffer()));

  console.log(prediction.label);
  if (SUPPORTED_MAGIKA_LABEL_LIST.includes(prediction.label)) {
    return c.json({
      ok: true,
    });
  }

  const fileType = await fileTypeFromBuffer(await file.arrayBuffer());
  console.log(fileType);
  if (SUPPORTED_MIME_TYPE_LIST.includes(fileType?.mime ?? '')) {
    return c.json({
      ok: true,
    });
  }

  return c.json({
    ok: false,
  });
});

export { app as identityImageApp };
