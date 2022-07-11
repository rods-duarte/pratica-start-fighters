import db from '../database/index.js';

interface Fighter {
  id: number;
  username: string;
  wins: number;
  losses: number;
  draws: number;
}

export async function getFighterData(fighter: string): Promise<Fighter> {
  const result = await db.query<Fighter>(
    `--sql
          SELECT * FROM FIGHTERS
          WHERE USERNAME = $1
        `,
    [fighter]
  );

  return result.rows[0];
}

export async function createNewFighter(fighter: string) {
  const result = await db.query(
    `--sql
          INSERT INTO FIGHTERS (username, wins, losses, draws)
          VALUES ($1, 0, 0, 0)
        `,
    [fighter]
  );

  return result.rows[0];
}

export async function updateUserStat(fighter: string, stat: string) {
  const set = `${stat} = ${stat} + 1`;

  try {
    await db.query(
      `--sql
          UPDATE FIGHTERS SET ${set} WHERE username = $1;
          `,
      [fighter]
    );

    await db.query(
      `--sql
      INSERT INTO FIGHTERS (username, ${stat})
      VALUES ($1, 1)
      ON CONFLICT (username) DO NOTHING
      `,
      [fighter]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getRanking(): Promise<Fighter[]> {
  const result = await db.query<Fighter>(
    `--sql
      SELECT USERNAME, WINS, LOSSES, DRAWS FROM FIGHTERS
      ORDER BY WINS DESC, DRAWS DESC 
    `
  );

  return result.rows;
}

const fighterRepository = {
  getFighterData,
  createNewFighter,
  updateUserStat,
  getRanking,
};

export default fighterRepository;
