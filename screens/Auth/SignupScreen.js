import { useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';

import { signUp } from '../../utils/Auth';

import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import { useNavigation } from '@react-navigation/native';
function SignupScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const signUpHandler = async ({ email, password, userName }) => {
    setIsAuthenticating(true);
    try {
      await signUp(email, password, userName);
    } catch (error) {
      // handle Errors here , being thrown from /utils/auth
      console.log(error, 'handle signup errors here.. email exists...etc');
      setIsAuthenticating(false);
      return;
    }

    navigation.navigate('Home');
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating a User..." />;

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
