import { useContext, useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { AuthContext } from '../../store/Auth-Context';
import { signUp } from '../../utils/Auth';

import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';

function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const resetLoginHandler = () => {
    setIsLogin(!isLogin);
  };
  const signUpHandler = async ({ email, password, userName }) => {
    setIsAuthenticating(true);
    try {
      let [token, uid, expiryTime] = await signUp(email, password, userName);
      if (token && uid && expiryTime) {
        authCtx.authenticate(token, uid);
      }
    } catch (error) {
      // handle Errors here , being thrown from /utils/auth
      console.log(error.message, 'handle signup errors here.. email exists...etc');
      setIsAuthenticating(false);
      return;
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating a User..." />;

  return (
    <AuthContent
      isLogin={isLogin}
      resetLoginHandler={resetLoginHandler}
      onAuthenticate={signUpHandler}
    />
  );
}

export default SignupScreen;
