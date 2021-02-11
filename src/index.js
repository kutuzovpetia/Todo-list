import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer);
ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
       <App />
    </Provider>
  </BrowserRouter>

  ,
  document.getElementById('root')
);

