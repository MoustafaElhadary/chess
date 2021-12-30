import { dbServerSide } from "lib/dbServerSide";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const { userId, slug } = req.body;

    // get game from db

    // if game exists, check if user is not player1 or player2

    // check if game is full

    // check if game is over

    // update game with new player
    
    
    const updates = {
      player1_id: userId,
      slug,
    };

    let { error, data } = await dbServerSide.from("game").upsert(updates);

    console.log({ error, data });

    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
