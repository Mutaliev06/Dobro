import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from "./redux/configureStore";
import { BrowserRouter } from "react-router-dom";
import SignIn from './components/App/SignIn';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
, document.getElementById('root')
);
