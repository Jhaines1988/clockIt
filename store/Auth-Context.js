import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  userId: '',
  isAuthenticated: false,
  authenticate: (token, uid) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [UID, setUID] = useState();

  function authenticate(token, uid) {
    setAuthToken(token);
    setUID(uid);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('uid', uid);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('uid');
  }

  const value = {
    token: authToken,
    userId: UID,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
