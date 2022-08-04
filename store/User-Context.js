import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({
  uid: '',
  getUID: () => {},
  setUID: () => {},
});

function UserContextProvider({ children }) {
  const [UID, setUID] = useState();
  async function setUserId(uid) {
    setUID(uid);
    await AsyncStorage.setItem('uid', uid);
  }
  const getUserID = async () => {
    const id = await AsyncStorage.getItem('uid');
    return id;
  };
  const value = {
    uid: UID,
    getUID: getUserID,
    setUID: setUserId,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
