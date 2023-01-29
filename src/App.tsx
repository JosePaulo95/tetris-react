import './App.css';

import ContainerBoard from './ContainerBoard';
import ContainerKeyboardInput from './ContainerKeyboardInput';
import ContainerTicker from './ContainerTicker';

function App() {
  return (
    <>
      <ContainerKeyboardInput></ContainerKeyboardInput>
      <ContainerTicker></ContainerTicker>
      <ContainerBoard></ContainerBoard>
    </>
  );
}
export default App;
