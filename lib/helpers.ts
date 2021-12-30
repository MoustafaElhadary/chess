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

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const makeId = (length: number) => {
  var result = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
