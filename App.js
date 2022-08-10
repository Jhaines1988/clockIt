import { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text } from 'react-native';
import AuthContextProvider, { AuthContext } from './store/Auth-Context';
import UserContextProvider, { UserContext } from './store/User-Context';
import * as SplashScreen from 'expo-splash-screen';
import { getUserActivities } from './db/readClockitData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import HomeScreen from './screens/Home Screen/HomeScreen';
import ClockItScreen from './screens/Clock It Screen/clockItScreen';
import IconButton from './components/buttons/IconButton';
import LoadingOverlay from './components/auth/ui/LoadingOverlay';
import { ActivityIndicator } from 'react-native';
// import Navigation from './navigation/AppNavigator';
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Root />
        </View>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

function Root() {
  let authCtx = useContext(AuthContext);
  let userCtx = useContext(UserContext);
  // fix with expo splash screen.  Documentation  on usage to replace <AppLoading/> was not clear
  // use App is ready for splashScreen.
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const uid = await AsyncStorage.getItem('uid');

      if (token && uid) {
        authCtx.authenticate(token, uid);
        userCtx.setUID(uid);
        setAppIsReady(true);
      }
    }
    getToken();
  }, []);

  if (!appIsReady) {
    return <LoadingOverlay message="Loading" />;
  }
  return (
    <Navigation>{authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}</Navigation>
  );
}

const Stack = createNativeStackNavigator();

const Navigation = ({ children }) => {
  const authCtx = useContext(AuthContext);
  return <NavigationContainer>{children}</NavigationContainer>;
};

const AuthStack = () => {
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
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const [navigatorReady, setNavigatorReady] = useState(false);

  useEffect(() => {
    async function getHomeScreenDataOnMount() {
      try {
        let fetchUserData = await getUserActivities(authCtx.userId);
        if (fetchUserData) {
          let expirationDate = fetchUserData.expiresAt;
          console.log(fetchUserData.activities);

          userCtx.setUserActivities(fetchUserData);
          setNavigatorReady(true);
        }
      } catch (error) {
        console.log('ERROR IN CHECK USER IN NAV', error);
      }
    }
    getHomeScreenDataOnMount();
  }, []);

  if (!navigatorReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingOverlay message="WhoAreYOU!!!!!!" />
      </View>
    );
  }
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
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout} />
          ),
        }}
      />
      <Stack.Screen name="Clockit" component={ClockItScreen} />
    </Stack.Navigator>
  );
};
