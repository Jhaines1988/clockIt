import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// context
import { AuthContext } from '../store/Auth-Context';
// screens

import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

// helpers
import authChange from '../utils/NavigationHelpers/authChangeListener';
import { validateWeekIsInRange } from '../db/readClockitData';
import { auth } from '../firebase';
// components
import IconButton from '../components/buttons/IconButton';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  const [appReady, setAppReady] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      }
    });
    async function checkUser() {
      if (isUser) {
        let weekExpiration = await validateWeekIsInRange(authCtx.userId);
      }
      setAppReady(true);
    }
    checkUser();
  }, []);

  if (appReady) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'gray' },
          headerTintColor: 'blue',
          contentStyle: { backgroundColor: 'black' },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ userID: authCtx.userId }}
          options={{
            headerRight: ({ tintColor }) => (
              <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout} />
            ),
          }}
        />
        <Stack.Screen name="ClockIt" component={ClockItScreen} />
      </Stack.Navigator>
    );
  } else {
    /// configure App Loading / expo splash screen here... ///
    return <View></View>;
  }
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'gray' },
        headerTintColor: 'blue',
        contentStyle: { backgroundColor: 'black' },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default Navigation;
