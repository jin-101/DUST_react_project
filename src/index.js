import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);