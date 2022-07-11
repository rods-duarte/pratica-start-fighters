import { Request, Response } from 'express';
import fighterRepository from '../repositories/fighterRepository.js';

import {
  compareTwoUsersStars,
  getFighterStars,
  updateUsersStats,
} from '../services/fightersService.js';

interface FightBody {
  firstUser: string;
  secondUser: string;
}

export interface FighterStars {
  user: string;
  totalStars: number;
}

export interface BattleResult {
  winner: string | null;
  losser: string | null;
  draw: boolean;
}

export async function fight(req: Request, res: Response) {
  const { firstUser, secondUser }: FightBody = req.body;

  const firstUserStars: FighterStars = await getFighterStars(firstUser);
  const secondUserStars: FighterStars = await getFighterStars(secondUser);

  const battleResult: BattleResult = compareTwoUsersStars(
    firstUserStars,
    secondUserStars
  );
  await updateUsersStats(battleResult, firstUser, secondUser);

  res.send(battleResult);
}

export async function returnRanking(req: Request, res: Response) {
  const fighters = await fighterRepository.getRanking();
  res.send({ fighters });
}
