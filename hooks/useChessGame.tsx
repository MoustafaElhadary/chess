import { boardState } from "atoms/boardAtom";
import { dbClientSide } from "lib/dbClientSide";
import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { GameEndpointResponse } from "types";
import { chess } from "lib/chessEngine";
import { debounce } from "lodash";

const useChessGame = (slug: string) => {
  const [game, setGame] = useState<GameEndpointResponse>();
  const setBoard = useSetRecoilState(boardState);

  const request = debounce(async (slug: string) => {
    const { data: newGame } = await dbClientSide
      .from<GameEndpointResponse>("game")
      .select(
        `*,
        player1:player1_id ( name, avatar_url ),
        player2:player2_id ( name, avatar_url )
        `
      )
      .eq("slug", slug)
      .single();
    if (newGame) {
      setGame(newGame);
      if (newGame.fen !== game?.fen) {
        chess.load(newGame.fen!);
        setBoard(chess.board);
      }
    }
  }, 200);

  const memoizedFetchGame = useCallback((slug) => request(slug), [request]);

  useEffect(() => {
    dbClientSide
      .from(`game:slug=eq.${slug}`)
      .on("UPDATE", () => memoizedFetchGame(slug))
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    memoizedFetchGame(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return {
    game,
  };
};

export default useChessGame;
