import Board from "components/Board";
import { initGame } from "lib/chessEngine";
import type { NextPage } from "next";
import { useEffect } from "react";

const Local: NextPage = () => {
  useEffect(() => {
    initGame();
  }, []);
  return (
    <div className="min-h-screen justify-center align-middle flex">
      <Board />
    </div>
  );
};

export default Local;
