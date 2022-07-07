import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { type, message }: { type: string; message: string } = err;

  if (type === 'Invalid Body') {
    return res.status(422).send(message);
  }

  if (
    err?.response.status === 404 &&
    err?.response.headers.server === 'GitHub.com'
  ) {
    return res.status(404).send('Invalid user !');
  }

  return res.status(500).send('Internal server error !');
};
