import { useState, useContext } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { AuthContext } from '../../store/Auth-Context';
import { UserContext } from '../../store/User-Context';
import { signUp } from '../../utils/Auth';

import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';

function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signUpHandler = async ({ email, password, userName }) => {
    setIsAuthenticating(true);
    try {
      let [token, uid] = await signUp(email, password, userName);
      if (token && uid) {
        authCtx.authenticate(token, uid);
        userContext.setUID(uid);
      }
    } catch (error) {
      // handle Errors here , being thrown from /utils/auth
      console.log(error, 'handle signup errors here.. email exists...etc');
      setIsAuthenticating(false);
      return;
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating a User..." />;

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
