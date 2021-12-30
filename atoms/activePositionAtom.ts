import { Square } from "chess.js";
import { atom } from "recoil";

export const activePositionState = atom({
  key: "activePositionState", // unique ID (with respect to other atoms/selectors)
  default: "" as Square | "", // default value (aka initial value)
});
