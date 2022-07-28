import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens

import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';

const AppNavigation = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppNavigation.Navigator initialRouteName='Home'>
        <AppNavigation.Screen
          name='Home'
          options={{ title: 'Clock It !' }}
          component={HomeScreen}
        />
        <AppNavigation.Screen name='ClockIt' component={ClockItScreen} />
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
