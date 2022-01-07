import { authState } from "atoms/authAtom";
import Board from "components/Board";
import { initGame } from "lib/chessEngine";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR, { KeyedMutator } from "swr";
import { GameEndpointResponse } from "types";

const Online: NextPage = () => {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: game,
    mutate,
  }: { data?: GameEndpointResponse; mutate: KeyedMutator<any> } = useSWR(
    `/api/game/${slug}`
  );

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="min-h-screen justify-center align-middle flex flex-col">
      {game && slug && !game.player2 && (
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
                userId: user?.id,
                slug,
              }),
            });
            mutate();
          }}
        >
          Join Game
        </button>
      )}
      <Board isBlack={user?.id === game?.player2_id} />
    </div>
  );
};

export default Online;
