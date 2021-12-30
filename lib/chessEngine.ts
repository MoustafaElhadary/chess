import * as ChessJS from "chess.js";
import { GameType, Promotion } from "types";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export const chess = new Chess();

export function initGame() {
  updateGame();
}

export function resetGame() {
  chess.reset();
  updateGame();
}

export function handleMove(from: ChessJS.Square, to: ChessJS.Square) {
  return move(from, to);
}

export function getMoves(from?: ChessJS.Square) {
  if (from) {
    return chess.moves({ square: from, verbose: true });
  }
  return chess.moves({ verbose: true });
}

function move(
  from: ChessJS.Square,
  to: ChessJS.Square,
  promotion?: "n" | "b" | "r" | "q" | undefined
) {
  let tempMove: ChessJS.ShortMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);

  console.log({ legalMove, tempMove });
  if (legalMove) {
    return updateGame();
  }
}

function updateGame(pendingPromotion?: Promotion): GameType {
  const isGameOver = chess.game_over();

  const game = {
    board: chess.board(),
    // pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
  };
  return game;
}
function getGameResult() {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? "BLACK" : "WHITE";
    return `CHECKMATE - WINNER - ${winner}`;
  } else if (chess.in_draw()) {
    let reason = "50 - MOVES - RULE";
    if (chess.in_stalemate()) {
      reason = "STALEMATE";
    } else if (chess.in_threefold_repetition()) {
      reason = "REPETITION";
    } else if (chess.insufficient_material()) {
      reason = "INSUFFICIENT MATERIAL";
    }
    return `DRAW - ${reason}`;
  } else {
    return "UNKNOWN REASON";
  }
}
