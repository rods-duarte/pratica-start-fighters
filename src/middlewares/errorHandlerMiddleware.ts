import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { type, message }: { type: string; message: string } = err;

  if (type === 'Invalid Body') {
    return res.status(422).send(message);
  }

  return res.status(500).send('Internal server error !');
};
