import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import searchReducer from './store/reducers/search';
import thunk from 'redux-thunk';

import electronApp from 'electron';
import electronConfig from 'electron-config';

const config = new electronConfig();

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  search: searchReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

if (config.get('downloadPath') == null){
  console.info(`No download config set, applying OS video path ${electronApp.remote.app.getPath('videos')}`);
  config.set('downloadPath', electronApp.remote.app.getPath('videos'));
}else{
  console.info(`Download directory config found : ${config.get('downloadPath')}`);
}

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);
