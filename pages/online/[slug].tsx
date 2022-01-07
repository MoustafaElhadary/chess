import { authState } from "atoms/authAtom";
import Board from "components/Board";
import { initGame } from "lib/chessEngine";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR, { useSWRConfig } from "swr";
import { GameEndpointResponse } from "types";

const Online: NextPage = () => {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const router = useRouter();
  const { slug } = router.query;
  const { mutate } = useSWRConfig();
  const { data: game }: { data?: GameEndpointResponse } = useSWR(
    `/api/game/${slug}`
  );

  const joinGame = async () => {
    const { data, error } = await mutate("/api/game/join", {
      userId: user?.id,
      slug,
    });
    console.log({ data, user: user });
    return data;
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="min-h-screen justify-center align-middle flex">
      {game && slug && !game.player2 && <> Join game</>}
      <Board isBlack={user?.id === game?.player2_id} />
    </div>
  );
};

export default Online;
