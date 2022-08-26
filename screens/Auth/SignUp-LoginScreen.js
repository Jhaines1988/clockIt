import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useContext, useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { AuthContext } from '../../store/Auth-Context';
import { signUp, login } from '../../utils/Auth';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';

const SignUpLoginScreen = () => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
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

  const signUpHandler = async ({ email, password, userName }) => {
    setIsAuthenticating(true);
    try {
      let [token, uid] = await signUp(email, password, userName);
      if (token && uid) {
        authCtx.authenticate(token, uid);
      }
    } catch (error) {
      // handle Errors here , being thrown from /utils/auth
      console.log(error.message, 'handle signup errors here.. email exists...etc');
      setIsAuthenticating(false);
      return;
    }
  };

  if (isLoggingIn || isAuthenticating)
    return <LoadingOverlay message={isLogin ? 'Logging you In' : 'Creating A User...'} />;
  return (
    <AuthContent
      isLogin={isLogin}
      resetLoginHandler={resetLoginHandler}
      onAuthenticate={isLogin ? loginHandler : signUpHandler}
    />
  );
};

export default SignUpLoginScreen;

const styles = StyleSheet.create({});
