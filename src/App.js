/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router';

export default class App extends Component {

  componentWillMount() {
    // Initialize Firebase
    const config = {
     // config object here
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, { }, applyMiddleware(thunk));
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}
