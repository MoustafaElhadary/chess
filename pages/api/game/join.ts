import { dbServerSide } from "lib/dbServerSide";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types";
import { definitions } from "types/supabase";

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

    let { error: fetchError, data: games } = await dbServerSide
      .from<definitions["game"]>("game")
      .select("*")
      .eq("slug", slug);

    if (fetchError) {
      res.status(400).json({ error: fetchError });
    }

    if (!games || games.length === 0) {
      res.status(400).json({ error: "Game not found" });
    }

    // if game exists, check if user is not player1 or player2
    const game = games![0];
    if (game.player1_id === userId || game.player2_id === userId) {
      res.status(400).json({ error: "You are already in this game" });
    }

    // check if game is full
    if (game.player1_id && game.player2_id && game.player1_id !== "" && game.player2_id !== "") {
      res.status(400).json({ error: "Game is full" });
    }

    // check if game is over
    if (game.winner) {
      res.status(400).json({ error: "Game is over" });
    }

    // update game with new player
    const updates = {
      player2_id: userId,
      id: game.id,
    };

    let { error: updateError, data } = await dbServerSide
      .from("game")
      .update(updates)
      .eq("id", game.id);

    if (updateError) {
      res.status(400).json({ error: updateError });
    }
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
