import { activePositionState } from "atoms/activePositionAtom";
import { authState } from "atoms/authAtom";
import { boardState } from "atoms/boardAtom";
import { movesState } from "atoms/movesAtom";
import { Square } from "chess.js";
import Piece from "components/Piece";
import { handleMove } from "lib/chessEngine";
import { isDarkSquare } from "lib/helpers";
import { useDrop } from "react-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BoardSquare } from "types";

const Square = ({
  square,
  index,
  highlight,
  position,
  active,
  isBlack = false,
  isOnline = false,
  slug,
}: {
  square: BoardSquare | null;
  index: number;
  highlight: boolean;
  position: Square;
  active: boolean;
  isBlack?: boolean;
  isOnline?: boolean;
  slug?: string;
}) => {
  const auth = useRecoilValue(authState);
  const setBoard = useSetRecoilState(boardState);
  const setMoves = useSetRecoilState(movesState);
  const [activeItemExists, setActivePosition] = useRecoilState(
    activePositionState
  );

  const darkSquareBg = isDarkSquare(index, isBlack)
    ? active
      ? "bg-[#B9CA42]"
      : "bg-[#769656]"
    : active
    ? "bg-[#F6F686]"
    : "bg-[#EEEED2]";

  let roundedCornerClass = "";

  switch (index) {
    case 0:
      roundedCornerClass = "rounded-tl-xl";
      break;
    case 7:
      roundedCornerClass = "rounded-tr-xl";
      break;
    case 56:
      roundedCornerClass = "rounded-bl-xl";
      break;
    case 63:
      roundedCornerClass = "rounded-br-xl";
      break;
  }

  const activeBorder = activeItemExists ? "hover:border-2 border-gray-600" : "";

  const [, drop] = useDrop({
    accept: "piece",
    drop: async (item: { id: string }) => {
      const [fromPosition] = item.id.split("_");
      const game = handleMove(fromPosition as Square, position);

      if (game) {
        setBoard(game.board);
        setMoves([]);
        setActivePosition("");
      }
      if (isOnline) {
        await fetch("/api/game/move", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: auth?.access_token,
            from: fromPosition,
            to: position,
            slug,
          }),
        });
        setMoves([]);
        setActivePosition("");
      }
    },
  });

  return (
    <div
      key={index}
      className={`${darkSquareBg} w-[12.5%] h-[12.5%] ${roundedCornerClass} shadow-slate-800 flex relative ${activeBorder}`}
      ref={drop}
      onClick={() => {
        setMoves([]);
        setActivePosition("");
      }}
    >
      {square === null ? "" : <Piece square={square} position={position} />}

      {highlight && square === null && (
        <div className="w-6 h-6 bg-slate-600 rounded-full items-center justify-center m-auto opacity-25 "></div>
      )}

      {highlight && square && (
        <div className="w-[70%] h-[70%] bg-transparent ring-slate-600 ring-8 rounded-full absolute inset-0 flex justify-center items-center z-10  m-auto opacity-25 "></div>
      )}
    </div>
  );
};

export default Square;
