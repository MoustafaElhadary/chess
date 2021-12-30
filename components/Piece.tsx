import { activePositionState } from "atoms/activePositionAtom";
import { movesState } from "atoms/movesAtom";
import { Square } from "chess.js";
import { getMoves } from "lib/chessEngine";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";
import { BoardSquare } from "types";

const Piece = ({
  square,
  position,
}: {
  position: Square;
  square: BoardSquare;
}) => {
  const setMoves = useSetRecoilState(movesState);
  const setActivePosition = useSetRecoilState(activePositionState);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "piece",
    item: { id: `${position}_${square.type}_${square.color}` },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  }));

  if (isDragging) {
    setMoves(getMoves(position));
    setActivePosition(position);
  }

  const pieceImg = `/assets/${square.type}_${square.color}.png`;
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div
        className="piece-container cursor-grab align-middle justify-center w-full h-full"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img
          src={pieceImg}
          alt=""
          className="max-w-[70%] max-h-[70%] place-content-center mx-auto my-2"
        />
      </div>
    </>
  );
};

export default Piece;
