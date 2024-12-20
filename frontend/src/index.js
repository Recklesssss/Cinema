import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createStore } from 'redux';
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider>
      <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
