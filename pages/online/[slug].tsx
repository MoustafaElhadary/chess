import { authState } from "atoms/authAtom";
import Board from "components/Board";
import useChessGame from "hooks/useChessGame";
import { chess, initGame } from "lib/chessEngine";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const OnlinePage: NextPage = () => {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const router = useRouter();
  const { slug } = router.query;

  const { game } = useChessGame(slug as string);

  return (
    <div className="min-h-screen justify-center align-middle flex flex-col">
      {game && slug && !game.player2 && game.player1_id !== user?.id && (
        <button
          type="button"
          className="items-center m-auto px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={async () => {
            await fetch("/api/game/join", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: auth?.access_token,
                slug,
              }),
            });
          }}
        >
          Join Game
        </button>
      )}
      <Board
        isBlack={user?.id === game?.player2_id}
        isOnline
        slug={slug as string}
      />
    </div>
  );
};

export default OnlinePage;
