import { useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { login } from '../../utils/Auth';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
function LoginScreen() {
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const loginHandler = async ({ email, password }) => {
    try {
      setIsLoggingIn(true);
      await login(email, password);
      setIsLoggingIn(false);
    } catch (error) {
      /// handle errors here coming from utils/auth
      console.log('HandleErrorsHere', error);
      setIsLoggingIn(false);
      return;
    }

    navigation.navigate('Home');
  };
  if (isLoggingIn) return <LoadingOverlay message="Logging you In" />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
