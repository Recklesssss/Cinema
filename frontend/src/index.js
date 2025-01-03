import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import allReducers from './components/reducer/index';

// Configure redux-persist
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Storage engine
  whitelist: ['userDatas'], // Reducers to persist
};

const persistedReducer = persistReducer(persistConfig, allReducers);

// Create the Redux store with persisted reducer
const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* Add PersistGate to ensure rehydration */}
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
