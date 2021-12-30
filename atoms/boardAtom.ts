import { chess } from "lib/chessEngine";
import { atom } from "recoil";


export const boardState = atom({
  key: "boardState", // unique ID (with respect to other atoms/selectors)
  default: chess.board(), // default value (aka initial value)
});
