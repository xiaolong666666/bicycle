import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Router from './router';
import Store from './redux/store'
import * as serviceWorker from './serviceWorker';
import './style/reset.css'

const store = Store()

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
