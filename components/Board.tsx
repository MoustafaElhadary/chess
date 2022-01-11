import { activePositionState } from "atoms/activePositionAtom";
import { boardState } from "atoms/boardAtom";
import { movesState } from "atoms/movesAtom";
import Square from "components/Square";
import { getPosition } from "lib/helpers";
import { useRecoilValue } from "recoil";

const Board = ({
  isBlack = false,
  isOnline = false,
  slug,
}: {
  isBlack?: boolean;
  isOnline?: boolean;
  slug?: string;
}) => {
  const board = useRecoilValue(boardState).flat();
  const moves = useRecoilValue(movesState);
  const activePosition = useRecoilValue(activePositionState);

  return (
    <div className="flex flex-wrap w-full h-full justify-center align-middle">
      {(isBlack ? board.reverse() : board).map((square, i) => (
        <Square
          key={i}
          square={square}
          index={i}
          highlight={moves.some((move) => move.to === getPosition(i, isBlack))}
          position={getPosition(i, isBlack)}
          active={getPosition(i, isBlack) === activePosition}
          isBlack={isBlack}
          isOnline={isOnline}
          slug={slug}
        />
      ))}
    </div>
  );
};

export default Board;
