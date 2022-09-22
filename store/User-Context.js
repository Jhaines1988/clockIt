import { createContext, useState, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findDay } from '../utils/DateTimeHelpers/getDay';
const initialActivitiesState = [];

export const UserContext = createContext({
  userId: '',
  currentActivityItem: {},
  activities: initialActivitiesState,
  setCurrentActivityItem: () => {},
  dispatch: () => {},
  getUID: () => {},
  setUID: () => {},
});

const updateActivitiesReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;

    case 'ADD':
      const addedActivitiesState = state;
      addedActivitiesState.push(action.payload);
      return addedActivitiesState;
    case 'UPDATE':
      // console.log(action.payload);
      const isEdit = action.payload.edit;
      const updatedWeeklyArray = state.map((item) => {
        if (item.id === action.payload.updatedActivity.id) {
          const day = action.payload.day ? action.payload.day : findDay().toDateString();
          if (isEdit) {
            item[day] ? (item.totalTime -= item[day]) : (item.totalTime -= 0);

            item[day] = action.payload.time;
            item.totalTime += action.payload.time;
          } else {
            item.totalTime += action.payload.time;
            item[day] ? (item[day] += action.payload.time) : (item[day] = action.payload.time);
          }
        }
        return item;
      });

      return updatedWeeklyArray;

    case 'DELETE':
      return action.payload;
    case 'RENAME':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
    default:
      return state;
  }
};

function UserContextProvider({ children }) {
  const [UID, setUID] = useState();
  const [currentActivityItem, setCurrentActivityItem] = useState({});
  const [updatedActivities, dispatch] = useReducer(updateActivitiesReducer, initialActivitiesState);

  async function setUserId(userId) {
    setUID(userId);
  }

  const getUserID = async () => {
    const id = await AsyncStorage.getItem('uid');
    return id;
  };

  const setCurrentActivityItemHandler = (item) => {
    setCurrentActivityItem(item);
  };

  const value = {
    userId: UID,
    currentActivityItem: currentActivityItem,
    activities: updatedActivities,

    setCurrentActivityItem: setCurrentActivityItemHandler,
    dispatch: dispatch,

    getUID: getUserID,
    setUID: setUserId,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
