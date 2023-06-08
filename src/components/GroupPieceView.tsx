import { Block } from '../types';
import PieceView from './PieceView';

type GroupPieceViewProps = {
  pieces: Block[];
  section?: string;
};

const GroupPieceView = ({ pieces, section }: GroupPieceViewProps) => {
  return (
    <>
      {pieces.map(
        (piece: Block, index: number): React.ReactElement => (
          <PieceView key={index} piece={piece} section={section} />
        ),
      )}
    </>
  );
};

export default GroupPieceView;
