import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from './redux/configure-store';

const initialState = {
    user: {
        connected: false,
        username: '',
        status: '',
        displayName: '',
        _id: '',
    },
    employees: [],
}

const store = configureStore(initialState);

ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
