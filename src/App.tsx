import './App.css';

import AudioContainer from './containers/AudioContainer';
import ContainerBoard from './containers/ContainerBoard';
import ContainerTicker from './containers/ContainerTicker';

function App() {
  return (
    <>
      <ContainerTicker></ContainerTicker>
      <ContainerBoard></ContainerBoard>
      <AudioContainer></AudioContainer>
    </>
  );
}
export default App;
