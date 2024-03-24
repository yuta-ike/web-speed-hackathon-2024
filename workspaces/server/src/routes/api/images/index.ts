import { OpenAPIHono } from '@hono/zod-openapi';

import { identityImageApp } from './identityImage';
import { postImageApp } from './postImage';

const app = new OpenAPIHono();

app.route('/', postImageApp);
app.route('/', identityImageApp);

export { app as imageApp };
