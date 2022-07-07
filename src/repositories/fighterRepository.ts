import db from '../database/index.js';

export async function getFighterData(fighter: string) {
  const result = await db.query(
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

const fighterRepository = {
  getFighterData,
  createNewFighter,
  updateUserStat,
};

export default fighterRepository;
