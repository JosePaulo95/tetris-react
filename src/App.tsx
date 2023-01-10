import './App.css';

import BlockGroup from './components/BlockGroup';

function App() {
  const shape: number[][] = [
    [1, 0],
    [1, 1],
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
      <BlockGroup grid={empty_board}></BlockGroup>
    </>
  );
}

export default App;
