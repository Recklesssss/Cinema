import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { legacy_createStore as createStore} from 'redux';
import {Provider} from 'react-redux'
import allReducers from './components/reducer/index';

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App /> 
     </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
