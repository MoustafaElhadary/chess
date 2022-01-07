import Board from "components/Board";
import { initGame } from "lib/chessEngine";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Online: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  console.log({slug})
  useEffect(() => {
    initGame();
  }, []);
  return (
    <div className="min-h-screen justify-center align-middle flex">
      <Board />
    </div>
  );
};

export default Online;
