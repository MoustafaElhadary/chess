import { PieceType, Square } from "chess.js";
import { definitions } from "types/supabase";

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
  fen: string;
};


export type ErrorResponse = {
  error?: unknown;
};


export type User = {
  name: string;
  id: string;
}


export type  GameEndpointResponse = definitions["game"] & {
  player1: definitions["profiles"] | null;
  player2: definitions["profiles"] | null;
};

export type GameJoinEndpointResponse = {
  status: string;
};

export type GameMoveEndpointResponse = {
  status: string;
};

export type  GameNewEndpointResponse = {
  player1_id: any;
  slug: string;
  turn: "b" | "w";
  fen: string;
};