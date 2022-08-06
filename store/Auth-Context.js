import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
  token: '',
  userId: '',
  test: '',
  isAuthenticated: false,
  updateTest: () => {},
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [UID, setUID] = useState();
  const [test, setTest] = useState('t');
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
  function updateTest() {
    console.log('ARE YOU WORKING');
    setTest(Math.random().toString());
  }
  const value = {
    token: authToken,
    userId: UID,
    test: test,
    isAuthenticated: !!authToken,
    updateTest: updateTest,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
