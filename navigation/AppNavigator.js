import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// context
import { AuthContext } from '../store/Auth-Context';
import HistoryContextProvider from '../store/History-Context';
import UserContextProvider from '../store/User-Context';
// screens

import SignUpLoginScreen from '../screens/Auth/SignUp-LoginScreen';
// import HomeScreen from '../screens/Home Screen/HomeScreen';
import ActivityHomeScreen from '../screens/Activity Home Screen/ActivityHomeScreen';
import ClockItScreen from '../screens/Clock It Screen/clockItScreen';
import EditHistoryScreen from '../screens/History Screen/EditHistoryScreen';
import HistoryScreen from '../screens/History Screen/HistoryScreen';
import HomeScreen from '../screens/Home Screen/HomeScreen';
import ManualTimeInputScreen from '../screens/Manual Time EntryScreen/ManualTimeInputScreen';
import RenameActivityScreen from '../screens/RenameActivityScreen/RenameActivityScreen';
import SettingsScreen from '../screens/Settings Screen/SettingsScreen';
// helpers
import { ClockItColors, SemiBoldHeaderStyles } from '../constants/styles';
// components
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivitiesAsync } from '../app/userHomeScreenInformation';
import LoadingOverlay from '../components/auth/ui/LoadingOverlay';
import GradientView from '../components/UI/BackgroundContainer';
import ClockItLogoHeader from '../components/UI/ClockItLogoHeader';
import { Button } from 'react-native';
import IconButton from '../components/buttons/IconButton';

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

  const authCtx = useContext(AuthContext);
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
            headerRight: () => {
              return (
                <IconButton
                  icon="log-out-outline"
                  size={24}
                  color="white"
                  onPress={() => {
                    authCtx.logout();
                  }}
                />
              );
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: (props) => <ClockItLogoHeader {...props} /> }}
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
  const user = useSelector((state) => state.userHomeScreen);
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
          headerTitle: `Clocking ${user.currentActivityItem.name}` || '',
          tabBarLabel: 'Clock It',
        }}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'This Week',
          headerTitle: `${user.currentActivityItem.name}` || '',
        }}
        name="ActivityHomeScreen"
        component={ActivityHomeScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'History',
          headerTitle: `${user.currentActivityItem.name} History` || '',
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
