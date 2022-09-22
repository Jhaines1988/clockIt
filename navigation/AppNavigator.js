import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// context
import { AuthContext } from '../store/Auth-Context';
import UserContextProvider, { UserContext } from '../store/User-Context';
import HistoryContextProvider from '../store/History-Context';
// screens

import SignUpLoginScreen from '../screens/Auth/SignUp-LoginScreen';
// import HomeScreen from '../screens/Home Screen/HomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import RenameActivityScreen from '../screens/RenameActivityScreen/RenameActivityScreen';
import ManualTimeInputScreen from '../screens/Manual Time EntryScreen/ManualTimeInputScreen';
import HistoryScreen from '../screens/History Screen/HistoryScreen';
import EditHistoryScreen from '../screens/History Screen/EditHistoryScreen';
import HomeScreen from '../screens/Home Screen/HomeScreen';
import ActivityHomeScreen from '../screens/Activity Home Screen/ActivityHomeScreen';
import SettingsScreen from '../screens/Settings Screen/SettingsScreen';
// helpers
import { ClockItColors, LargeHeaderStyles, SemiBoldHeaderStyles } from '../constants/styles';
// components
import IconButton from '../components/buttons/IconButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GradientView from '../components/UI/BackgroundContainer';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivitiesAsync } from '../app/userHomeScreenInformation';
import LoadingOverlay from '../components/auth/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
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
  const user = useSelector((state) => state.userHomeScreen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserActivitiesAsync(user.userId));
  }, [dispatch]);

  if (!user.loaded) {
    return (
      <GradientView>
        <LoadingOverlay message="Getting Your Activities" />
      </GradientView>
    );
  }
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
          <Stack.Screen
            name="EditHistoryScreen"
            options={{ headerTitle: '', headerBackTitle: 'Back' }}
            component={EditHistoryScreen}
          />
          <Stack.Screen
            name="ManualTimeInputScreen"
            options={{ headerTitle: '', headerBackTitle: 'Back' }}
            component={ManualTimeInputScreen}
          />

          <Stack.Screen
            name="ActivityScreen"
            options={{ headerTitle: '', headerBackTitle: 'Home' }}
            component={BottomTabNavigation}
          />
        </Stack.Navigator>
      </HistoryContextProvider>
    </UserContextProvider>
  );
};

function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === 'ActivityHomeScreen') {
            iconName = 'document-text-outline';
          } else if (route.name === 'ClockItScreen') {
            iconName = 'stopwatch-outline';
          } else if (route.name === 'SettingsScreen') {
            iconName = 'settings-outline';
          } else if (route.name === 'EditHistoryScreen') {
            iconName = 'calendar-outline';
          }
          return <Ionicons name={iconName} color="white" size={24} />;
        },
        headerStyle: { backgroundColor: ClockItColors.blue, height: 80 },
        headerShadowVisible: false,
        headerTitleStyle: [SemiBoldHeaderStyles],
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black' },
      })}>
      <BottomTab.Screen
        name="ClockItScreen"
        component={ClockItScreen}
        options={{
          headerTitle: '',

          tabBarLabel: 'ClockIt',
        }}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'This Week',
        }}
        name="ActivityHomeScreen"
        component={ActivityHomeScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'History',
          headerTitle: 'History',
        }}
        name="EditHistoryScreen"
        component={EditHistoryScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </BottomTab.Navigator>
  );
}
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
