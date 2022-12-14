import { useState, useContext } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { Alert } from 'react-native';
import { login } from '../../utils/Auth';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import { AuthContext } from '../../store/Auth-Context';
import { UserContext } from '../../store/User-Context';
function LoginScreen() {
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const resetLoginHandler = () => {
    setIsLogin(!isLogin);
  };
  const loginHandler = async ({ email, password }) => {
    setIsLoggingIn(true);
    try {
      let [token, uid] = await login(email, password);
      if (token && uid) {
        authCtx.authenticate(token, uid);
      }
    } catch (error) {
      Alert.alert(`${error.message}`);
      setIsLoggingIn(false);
    }
  };
  if (isLoggingIn) return <LoadingOverlay message="Logging you In" />;
  return (
    <AuthContent
      isLogin={isLogin}
      resetLoginHandler={resetLoginHandler}
      onAuthenticate={loginHandler}
    />
  );
}

export default LoginScreen;
