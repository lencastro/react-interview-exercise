import React, { Component } from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import FriendListApp from './FriendListApp';
import * as reducers from '../reducers';
import logger from 'redux-logger';

const reducer = combineReducers(reducers);
const store = createStore(reducer,  applyMiddleware(logger));


export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <FriendListApp />
        </Provider>
      </div>
    );
  }
}
