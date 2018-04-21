import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadingBarReducer } from 'react-redux-loading-bar';
import searchReducer from './store/reducers/search';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const electronApp = window.require('electron').remote;
const electronConfig = window.require('electron-config');
const config = new electronConfig();

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    search: searchReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

if (config.get('downloadPath') == null){
    console.log(`No download config set, applying OS video path ${electronApp.app.getPath('videos')}`);
    config.set('downloadPath', electronApp.app.getPath('videos'));
}else{
    console.log(`Download directory config found : ${config.get('downloadPath')}`)
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
