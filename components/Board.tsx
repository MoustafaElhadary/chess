import { activePositionState } from "atoms/activePositionAtom";
import { boardState } from "atoms/boardAtom";
import { movesState } from "atoms/movesAtom";
import Square from "components/Square";
import { getPosition } from "lib/helpers";
import { useRecoilValue } from "recoil";

const Board = ({ isBlack = false }: { isBlack?: boolean }) => {
  const board = useRecoilValue(boardState).flat();
  const moves = useRecoilValue(movesState);
  const activePosition = useRecoilValue(activePositionState);

  return (
    <div className="flex flex-wrap w-[600px] h-[600px] justify-center align-middle mx-auto my-auto">
      {(isBlack ? board.reverse() : board).map((square, i) => (
        <Square
          key={i}
          square={square}
          index={i}
          highlight={moves.some((move) => move.to === getPosition(i, isBlack))}
          position={getPosition(i, isBlack)}
          active={getPosition(i, isBlack) === activePosition}
          isBlack={isBlack}
        />
      ))}
      
    </div>
  );
};

export default Board;
