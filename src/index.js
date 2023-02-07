import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createStore } from 'redux';``
import App from './App';
// import rootReducer from './reducers';

// const store = createStore(rootReducer);
// console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);