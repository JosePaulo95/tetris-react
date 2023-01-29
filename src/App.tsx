import './App.css';

import ContainerKeyboardInput from './ContainerKeyboardInput';
import ContainerBoard from './containers/ContainerBoard';
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
