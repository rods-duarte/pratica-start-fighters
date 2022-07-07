import { Request, Response } from 'express';
import fighterRepository from '../repositories/fighterRepository.js';

import {
  compareTwoUsersStars,
  getFighterStars,
  updateUsersStats,
} from '../services/fightersService.js';

export async function fight(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    req.body;

  const firstUserStars = await getFighterStars(firstUser);
  const secondUserStars = await getFighterStars(secondUser);

  const battleResult: { winner: any; losser: any; draw: boolean } =
    compareTwoUsersStars(firstUserStars, secondUserStars);
  await updateUsersStats(battleResult, firstUser, secondUser);

  res.send(battleResult);
}

export async function returnRanking(req: Request, res: Response) {
  const fighters = await fighterRepository.getRanking();
  res.send({ fighters });
}
