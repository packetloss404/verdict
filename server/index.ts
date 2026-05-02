import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';
import { neonConfig } from '@neondatabase/serverless';
import { createHonoServer } from 'react-router-hono-server/node';
import { serializeError } from 'serialize-error';
import ws from 'ws';
import { API_BASENAME, api } from './route-builder';

neonConfig.webSocketConstructor = ws;

const app = new Hono();

app.use('*', requestId());

app.onError((err, c) => {
  if (c.req.method !== 'GET') {
    return c.json(
      { error: 'An error occurred in your app', details: serializeError(err) },
      500,
    );
  }
  return c.html(`<pre>${serializeError(err).message ?? 'Internal Server Error'}</pre>`, 500);
});

if (process.env.CORS_ORIGINS) {
  app.use(
    '/*',
    cors({
      origin: process.env.CORS_ORIGINS.split(',').map((o) => o.trim()),
    }),
  );
}

for (const method of ['post', 'put', 'patch'] as const) {
  app[method](
    '*',
    bodyLimit({
      maxSize: 4.5 * 1024 * 1024,
      onError: (c) => c.json({ error: 'Body size limit exceeded' }, 413),
    }),
  );
}

app.route(API_BASENAME, api);

export default await createHonoServer({
  app,
  defaultLogger: false,
});
