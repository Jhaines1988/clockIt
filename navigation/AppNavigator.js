import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// context
import { AuthContext } from '../store/Auth-Context';
import UserContextProvider, { UserContext } from '../store/User-Context';
import HistoryContextProvider from '../store/History-Context';
// screens

import SignUpLoginScreen from '../screens/Auth/SignUp-LoginScreen';
import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import RenameActivityScreen from '../screens/RenameActivityScreen/RenameActivityScreen';
import HistoryScreen from '../screens/History Screen/HistoryScreen';
// helpers
import { ClockItColors } from '../constants/styles';
// components
import IconButton from '../components/buttons/IconButton';

const Stack = createNativeStackNavigator();

//
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: ClockItColors.blue },
      }}>
      <Stack.Screen name="SignupLogin" component={SignUpLoginScreen} />
    </Stack.Navigator>
  );
}
const AuthenticatedStack = () => {
  return (
    <UserContextProvider>
      <HistoryContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: ClockItColors.blue },
            headerTintColor: 'white',
          }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Clockit"
            component={ClockItScreen}
            options={{
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="RenameActivityScreen"
            options={{ headerTitle: '', headerBackTitle: 'Back' }}
            component={RenameActivityScreen}
          />
          <Stack.Screen
            name="HistoryScreen"
            options={{ headerTitle: '', headerBackTitle: 'Back' }}
            component={HistoryScreen}
          />
        </Stack.Navigator>
      </HistoryContextProvider>
    </UserContextProvider>
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
