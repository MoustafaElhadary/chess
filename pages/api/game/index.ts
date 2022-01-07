import { dbServerSide } from "lib/dbServerSide";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types";
import { definitions } from "types/supabase";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<definitions["game"] | ErrorResponse>
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
    const game = games![0];

    res.status(200).json(game);
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err });
  }
}
