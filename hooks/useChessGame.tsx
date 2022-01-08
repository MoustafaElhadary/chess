import { boardState } from "atoms/boardAtom";
import { dbClientSide } from "lib/dbClientSide";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { GameEndpointResponse } from "types";
import { chess } from "lib/chessEngine";

const useChessGame = (slug: string) => {
  const [game, setGame] = useState<GameEndpointResponse>();
  const setBoard = useSetRecoilState(boardState);


  useEffect(() => {
    dbClientSide
      .from(`game:slug=eq.${slug}`)
      .on("UPDATE", fetchGame)
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  useEffect(() => {
    fetchGame();
  }, [slug]);

  const fetchGame = async () => {
    const { data: newGame } = await dbClientSide
      .from<GameEndpointResponse>("game")
      .select(
        `*,
      player1:player1_id ( name, avatar_url ),
      player2:player2_id ( name, avatar_url )
      `
      )
      .eq("slug", slug as string)
      .single();
    if (newGame) {
      setGame(newGame);
      if(newGame.fen) {
        chess.load(newGame.fen)
        setBoard(chess.board);
      }
    }
  };

  return {
    game,
  };
};

export default useChessGame;
