import axios from 'axios';

import fighterRepository from '../repositories/fighterRepository.js';

export async function getFighterStars(fighter: string) {
  const URL = `https://api.github.com/users/${fighter}/repos`;
  const response: { data: [] } = await axios.get(URL);
  const repos = response.data;

  const totalStars: number = repos.reduce(
    (acc: number, repo: { stargazers_count: number }) =>
      acc + repo.stargazers_count,
    0
  );

  return {
    user: fighter,
    totalStars,
  };
}

export function getFighterStats(fighter: string) {
  let user = fighterRepository.getFighterData(fighter);

  if (!user) {
    user = fighterRepository.createNewFighter(fighter);
  }

  return user;
}

export function compareTwoUsersStars(
  firstFighter: { user: string; totalStars: number },
  secondFighter: { user: string; totalStars: number }
) {
  if (firstFighter.totalStars > secondFighter.totalStars) {
    return {
      winner: firstFighter.user,
      losser: secondFighter.user,
      draw: false,
    };
  }

  if (firstFighter.totalStars < secondFighter.totalStars) {
    return {
      winner: secondFighter.user,
      losser: firstFighter.user,
      draw: false,
    };
  }

  return {
    winner: null,
    losser: null,
    draw: true,
  };
}

export async function updateUsersStats(
  battleResult: {
    losser: any;
    winner: any;
    draw: boolean;
  },
  firstUser: string,
  secondUser: string
) {
  const { losser, draw, winner } = battleResult;

  if (draw) {
    await fighterRepository.updateUserStat(firstUser, 'draws');
    await fighterRepository.updateUserStat(secondUser, 'draws');
    return;
  }

  await fighterRepository.updateUserStat(winner, 'wins');
  await fighterRepository.updateUserStat(losser, 'losses');
}
