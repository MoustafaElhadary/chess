import { Move } from "chess.js";
import { atom } from "recoil";

const arr: Move[] = [];
export const movesState = atom({
  key: "movesState", // unique ID (with respect to other atoms/selectors)
  default: arr, // default value (aka initial value)
});
