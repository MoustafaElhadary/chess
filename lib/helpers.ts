import { Square } from "chess.js";

export const getXYPosition = (i: number) => {
  const x = i % 8;
  const y = Math.abs(Math.floor(i / 8) - 7);
  return { x, y };
};

export const isDarkSquare = (i: number) => {
  const { x, y } = getXYPosition(i);
  return (x + y) % 2 === 0;
};

export const getPosition = (i: number): Square => {
  const { x, y } = getXYPosition(i);
  const letter = "abcdefgh"[x];
    return `${letter}${y + 1}` as Square;
};
