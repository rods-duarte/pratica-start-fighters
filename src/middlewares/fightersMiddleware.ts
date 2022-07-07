import { Request, Response, NextFunction } from 'express';

export async function validateFighters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    req.body;

  if (!firstUser || !secondUser) {
    throw {
      type: 'Invalid Body',
      message: 'Missing username !',
    };
  }

  if (firstUser === secondUser) {
    throw {
      type: 'Invalid Body',
      message: 'Use different users !',
    };
  }

  next();
}
