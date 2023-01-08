import './App.css';

import BlockGroup from './components/BlockGroup';

function App() {
  const shape: number[][] = [
    [1, 0],
    [1, 1],
  ];
  return (
    <>
      <BlockGroup shape={shape}></BlockGroup>
      <BlockGroup shape={shape}></BlockGroup>
    </>
  );
}

export default App;
