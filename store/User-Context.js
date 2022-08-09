import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserActivities } from '../db/readClockitData';
import { Timestamp } from 'firebase/firestore';
import { getStartAndEndOfWeek } from '../utils/DateTimeHelpers/getDay';
export const UserContext = createContext({
  userId: '',
  userActivities: [],
  expirationDate: '',
  startOfWeek: '',
  setUserActivities: () => {},
  getWeekStartStop: () => {},
  setExpirationDate: () => {},
  getExpirationDate: () => {},
  getUID: () => {},
  setUID: () => {},
});

function UserContextProvider({ children }) {
  const [UID, setUID] = useState();
  const [userActivitiesOnLoad, setUserActivitiesOnLoad] = useState([]);
  const [expiration, setExpiration] = useState('');
  const [startOfWeek, setStartOfWeek] = useState('');
  const [endOfWeek, setEndOfWeek] = useState('');
  async function setUserId(userId) {
    setUID(userId);
    await AsyncStorage.setItem('uid', userId);
  }
  const getUserID = async () => {
    const id = await AsyncStorage.getItem('uid');
    return id;
  };

  const getWeekStartStop = () => {
    console.log('HELLO IM RUNNING CAUSE IM SUPPOSE TO');
    const [start, end] = getStartAndEndOfWeek();
    console.log(typeof start);
    setStartOfWeek(start);
    setEndOfWeek(end);
  };

  const setExpirationDate = async (dateString) => {
    try {
      console.log('IS THIS RUNNING ON LOGIN');
      setExpiration(dateString);
      await AsyncStorage.setItem('expiration', dateString);
    } catch (error) {
      console.log('DOES THIS ERRO EVEN THROW?', error);
    }
  };

  const getExpirationDate = async () => {
    let expiration = await AsyncStorage.getItem('expiration');
    return expiration;
  };
  const setUserActivities = async (fetchedUserActivities) => {
    try {
      setUserActivitiesOnLoad((prevState) => fetchedUserActivities.activities);
    } catch (error) {
      console.log('Error In User Context setting User activities', error);
    }
  };
  const value = {
    userId: UID,
    userActivities: userActivitiesOnLoad,
    expirationDate: expiration,
    startOfWeek: startOfWeek,
    endOfWeek: endOfWeek,
    setUserActivities: setUserActivities,
    getWeekStartStop: getWeekStartStop,
    setExpirationDate: setExpirationDate,
    getExpirationDate: getExpirationDate,
    getUID: getUserID,
    setUID: setUserId,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
