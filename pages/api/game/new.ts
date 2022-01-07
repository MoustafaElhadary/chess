import { initGame } from "lib/chessEngine";
import { dbServerSide } from "lib/dbServerSide";
import { makeId } from "lib/helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, GameNewEndpointResponse } from "types";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameNewEndpointResponse | ErrorResponse>
) {
  try {
    const { userId } = req.body;
    const slug = makeId(10);

    const game = initGame();

    const updates = {
      player1_id: userId,
      slug,
      turn: game.turn,
      fen: game.fen,
    };

    let { error, data } = await dbServerSide.from("game").upsert(updates);

    console.log({ error, data });

    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json(updates);
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
