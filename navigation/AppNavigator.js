import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// context
import { AuthContext } from '../store/Auth-Context';
import UserContextProvider, { UserContext } from '../store/User-Context';
// screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import RenameActivityScreen from '../screens/RenameActivityScreen/RenameActivityScreen';

// helpers
import { ClockItColors } from '../constants/styles';
// components
import IconButton from '../components/buttons/IconButton';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { deleteItemFromActivitiesList } from '../db/deleteClockitData';
const Stack = createNativeStackNavigator();

//
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: ClockItColors.blue },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: ClockItColors.blue },
        headerTintColor: 'white',
        // headerShown: false,
        // contentStyle: { backgroundColor: ClockItColors.dkBlue },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        // options={{
        //   headerTitle: '',
        // headerRight: ({ tintColor }) => (
        //   <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout} />
        // ),
        // }}
      />
      <Stack.Screen
        name="Clockit"
        component={ClockItScreen}
        options={{
          headerTitle: '',
          headerBackTitle: 'Back',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="ellipsis-vertical-outline"
              color={tintColor}
              size={24}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen name="RenameActivityScreen" component={RenameActivityScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default Navigation;
