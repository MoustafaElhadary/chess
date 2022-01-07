import { dbServerSide } from "lib/dbServerSide";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, GameEndpointResponse } from "types";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameEndpointResponse | ErrorResponse>
) {
  try {
    const { slug } = req.query;

    // get game from db
    let { error: fetchError, data: games } = await dbServerSide
      .from<GameEndpointResponse>("game")
      .select(
        `*,
      player1:player1_id ( name, avatar_url ),
      player2:player2_id ( name, avatar_url )
      `
      )
      .eq("slug", slug as string);

    if (fetchError) {
      res.status(400).json({ error: fetchError });
    }

    if (!games || games.length === 0) {
      res.status(400).json({ error: "Game not found" });
    }
    const game = games![0];

    res.status(200).json(game);
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
