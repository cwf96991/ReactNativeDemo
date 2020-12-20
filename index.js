
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './screen/MainPage';
import Browser from './screen/browser';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{ headerShown:false }}
        />
        <Stack.Screen name="Detail" component={Browser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => MyStack);
