import './styles/reset.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Menu from './screens/Menu';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Router>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/menu" Component={Menu} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
