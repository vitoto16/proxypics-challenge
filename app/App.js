/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Text>Initial App!</Text>
      </View>
    </Provider>
  );
};

export default App;
