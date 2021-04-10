import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Router';
import {Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import interceptor from './interceptor'


library.add(fas)

const history = createBrowserHistory()
export default history;

ReactDOM.render(
  <Router history={history} >
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
