import { useEffect, useState, useContext } from 'react';
import AuthContextProvider, { AuthContext } from './store/Auth-Context';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './navigation/AppNavigator';

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

function Root() {
  let authCtx = useContext(AuthContext);
  // fix with expo splash screen.  Documentation  on usage to replace <AppLoading/> was not clear
  // use App is ready for splashScreen.
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const uid = await AsyncStorage.getItem('uid');
      if (token && uid) {
        authCtx.authenticate(token, uid);
        setAppIsReady(true);
      } else {
        setAppIsReady(true);
      }
    }
    getToken();
  }, []);

  return <Navigation />;
}
