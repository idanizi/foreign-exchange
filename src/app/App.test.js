import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';

const middleWares = [];
const mockStore = configureStore(middleWares);

describe('App', () => {

  it('renders without crashing', () => {

    const initialState = {user: {}};
    const store = mockStore(initialState);

    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

