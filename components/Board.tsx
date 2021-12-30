import { activePositionState } from "atoms/activePositionAtom";
import { boardState } from "atoms/boardAtom";
import { movesState } from "atoms/movesAtom";
import Square from "components/Square";
import { getPosition } from "lib/helpers";
import { useRecoilValue } from "recoil";

const Board = () => {
  const board = useRecoilValue(boardState);
  const moves = useRecoilValue(movesState);
  const activePosition = useRecoilValue(activePositionState);

  return (
    <div className="flex flex-wrap w-[600px] h-[600px] justify-center align-middle mx-auto mt-32">
      {board.flat().map((square, i) => (
        <Square
          key={i}
          square={square}
          index={i}
          highlight={moves.some((move) => move.to === getPosition(i))}
          position={getPosition(i)}
          active={getPosition(i) === activePosition}
        />
      ))}
    </div>
  );
};

export default Board;
