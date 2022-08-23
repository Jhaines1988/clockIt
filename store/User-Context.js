import { createContext, useState, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const updatedState = state;
      updatedState.push(action.payload);

      return updatedState;
    case 'UPDATE':
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

const mergeArrays = (state, updatedItem) => {
  return;
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
