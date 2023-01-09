import './App.css';

import BlockGroup from './components/BlockGroup';
import EmptyBlock from './components/EmptyBlock';

function App() {
  const shape: number[][] = [
    [1, 0],
    [1, 1],
  ];
  const empty_board: number[][] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  return (
    <>
      {/* <BlockGroup shape={shape} Block={Color1Block}></BlockGroup> */}
      <BlockGroup shape={empty_board} Block={EmptyBlock}></BlockGroup>
    </>
  );
}

export default App;
