import { useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { signUp } from '../../utils/Auth';

import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const signUpHandler = async ({ email, password, userName }) => {
    setIsAuthenticating(true);
    await signUp(email, password, userName);
    setIsAuthenticating(false);
  };
  if (isAuthenticating) return <LoadingOverlay message="Creating a User..." />;

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
