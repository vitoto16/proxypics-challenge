/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import reducers from './src/reducers';

// COMMON SCREENS
import Login from './src/common/screens/Login';
import Registration from './src/common/screens/Registration';

// REQUESTER SCREENS
import RequesterDashboard from './src/requester/screens/RequesterDashboard';

// ASSIGNEE SCREENS
import AssigneeDashboard from './src/assignee/screens/AssigneeDashboard';
import SubmitPhotos from './src/assignee/screens/SubmitPhotos';

screens = {
  Login,
  Registration,
  RequesterDashboard,
  AssigneeDashboard,
  SubmitPhotos,
};

const store = createStore(reducers, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ActionSheetProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}>
              {Object.keys(screens).map(k => (
                <Stack.Screen name={k} component={screens[k]} key={k} />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </ActionSheetProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
