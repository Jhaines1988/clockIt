import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({
  userId: '',
  userActivities: [],
  updateUserActivities: () => {},
  getUID: () => {},
  setUID: () => {},
});

function UserContextProvider({ children }) {
  const [UID, setUID] = useState();
  const [userActivities, setUserActivities] = useState([]);

  async function setUserId(userId) {
    setUID(userId);
    // await AsyncStorage.setItem('uid', userId);
  }
  const getUserID = async () => {
    const id = await AsyncStorage.getItem('uid');
    return id;
  };

  const setUserActivitiesHandler = async (activities) => {
    try {
      setUserActivities(activities);
    } catch (error) {
      console.log('Error In User Context setting User activities', error);
    }
  };
  const value = {
    userId: UID,
    userActivities: userActivities,
    updateUserActivities: setUserActivitiesHandler,
    getUID: getUserID,
    setUID: setUserId,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
