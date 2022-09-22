import { useEffect, useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import AuthContextProvider, { AuthContext } from './store/Auth-Context';
import UserContextProvider, { UserContext } from './store/User-Context';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/auth/ui/LoadingOverlay';
import Navigation from './navigation/AppNavigator';
import store from './app/store';
import thunk from 'redux-thunk';

import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from './app/userHomeScreenInformation';
import { Provider } from 'react-redux';

import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  useEffect(() => {
    async function prepare() {
      try {
        // load fonts or animations / logo here.
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
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return <LoadingOverlay message="Loading" />;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </View>
    </Provider>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const uid = await AsyncStorage.getItem('uid');

      if (token && uid) {
        authCtx.authenticate(token, uid);
        dispatch(setUserId(uid));
        setAppIsReady(true);
      } else {
        setAppIsReady(true);
      }
    }

    getToken();
  }, []);

  if (!appIsReady) {
    return <LoadingOverlay message="Loading" />;
  }

  return <Navigation />;
}
