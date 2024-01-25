import './App.css'

import AudioContainer from './containers/AudioContainer'
import ContainerBoard from './containers/ContainerBoard'
import ContainerScore from './containers/ContainerScore'
import ContainerTicker from './containers/ContainerTicker'

function App() {
  return (
    <>
      <ContainerTicker />
      <ContainerBoard />
      <ContainerScore />
      <AudioContainer />
    </>
  )
}
export default App
