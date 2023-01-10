import './App.css';

import BlockGroup from './components/BlockGroup';

function App() {
  const current_board: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 3, 0, 1],
    [0, 2, 2, 0, 1],
    [1, 1, 2, 0, 1],
  ];
  const empty_board: number[][] = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ];
  return (
    <>
      {/* <BlockGroup shape={shape} Block={Color1Block}></BlockGroup> */}
      <BlockGroup grid={current_board}></BlockGroup>
      <BlockGroup grid={empty_board}></BlockGroup>
    </>
  );
}

export default App;
