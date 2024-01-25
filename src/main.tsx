import './styles/reset.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './App'
import Menu from './screens/Menu'
import store from './store'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Router>
        <Routes>
          <Route Component={Menu} path="/" />
          <Route Component={App} path="/play" />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
)
