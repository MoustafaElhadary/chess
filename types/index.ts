import { PieceType, Square } from "chess.js";

export type BoardSquare = {
  type: PieceType;
  color: "b" | "w";
};

export type Promotion = {
  from: Square;
  to: Square;
  color: "b" | "w";
};

export type GameType = {
  board: ({
    type: PieceType;
    color: "b" | "w";
  } | null)[][];
  // pendingPromotion,
  isGameOver: boolean;
  turn: "b" | "w";
  result: string | null;
};
