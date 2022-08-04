import React, { useState, useEffect, useContext, useRef } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Colors } from '../constants/styles';
// screens
import { onAuthStateChange } from '../utils/Auth';
import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AuthContext } from '../store/Auth-Context';
import UserContextProvider, { UserContext } from '../store/User-Context';
import IconButton from '../components/buttons/IconButton';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const [currentUserId, setCurrentUserId] = useState(authCtx.userId);
  const [appReady, setAppReady] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUserId(uid);
        setAppReady(true);
      } else {
        console.log('user is signed out... ');
      }
    });
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
