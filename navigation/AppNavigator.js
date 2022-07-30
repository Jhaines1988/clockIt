import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/styles';
// screens

import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
const AppNavigation = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppNavigation.Navigator initialRouteName="Auth">
        <AppNavigation.Screen
          name="Home"
          options={{ title: 'Clock It !' }}
          component={HomeScreen}
        />
        <AppNavigation.Screen name="ClockIt" component={ClockItScreen} />
        <AppNavigation.Screen name="Auth" component={AuthStack} />
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
};
function AuthStack() {
  return (
    <AppNavigation.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <AppNavigation.Screen name="Login" component={LoginScreen} />
      <AppNavigation.Screen name="Signup" component={SignupScreen} />
    </AppNavigation.Navigator>
  );
}

export default AppNavigator;
