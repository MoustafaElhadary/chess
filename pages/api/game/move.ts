import { handleMove, loadFen } from "lib/chessEngine";
import { dbServerSide } from "lib/dbServerSide";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, GameMoveEndpointResponse } from "types";
import { definitions } from "types/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameMoveEndpointResponse | ErrorResponse>
) {
  try {
    const { access_token, from, to, slug } = req.body;
    const { user } = await dbServerSide.auth.api.getUser(
      access_token as string
    );
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    const userId = user?.id!;

    let { error: fetchError, data: games } = await dbServerSide
      .from<definitions["game"]>("game")
      .select("*")
      .eq("slug", slug as string);

    if (fetchError) {
      res.status(400).json({ error: fetchError });
    }

    if (!games || games.length === 0) {
      res.status(400).json({ error: "Game not found" });
    }
    let game = games![0];

    loadFen(game.fen!);
    const newGame = handleMove(from, to);

    console.log({ newGame });

    if (newGame) {
      game = { ...game, fen: newGame.fen, turn: newGame.turn };
      const { error: saveError } = await dbServerSide
        .from<definitions["game"]>("game")
        .update(game)
        .eq("id", game.id!);

      if (saveError) {
        res.status(400).json({ error: saveError });
      }

      res.status(200).json({ status: "success" });
    }
    res.status(400).json({ error: "No changes" });
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
