import React, { useReducer } from 'react';

const initialActivityIdToNameMap = {};
export const HistoryContext = React.createContext({
  history: initialActivityIdToNameMap,
  itemToEdit: {},
  dispatch: () => {},
});

const activityIdToNameReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZENAMES':
      const initializedState = {};

      action.payload.forEach((item) => {
        initializedState[item.id] = { name: item.name, history: [], fullyLoaded: false };
      });

      return initializedState;
    case 'POPULATE':
      if (action.payload.fetchedData.length === 0) {
        return state;
      }
      const id = action.payload.id;
      if (state[id].history.length || state[id].fullyLoaded) return state;

      return {
        ...state,
        [id]: {
          name: state[id].name,
          history: [...state[id].history, ...action.payload.fetchedData],
        },
      };

    case 'LOAD_MORE_DATA':
      const newLoadState = state[action.payload.id].history.concat(action.payload.loadedResults);
      return {
        ...state,
        [action.payload.id]: {
          name: state[action.payload.id].name,
          history: newLoadState,
          fullyLoaded: false,
        },
      };

    case 'ALL_DATA_LOADED':
      let newState = {
        ...state,
        [action.payload.id]: {
          name: state[action.payload.id].name,
          history: state[action.payload.id].history,
          fullyLoaded: true,
        },
      };
      return newState;
    case 'EDIT_ITEM':
      const newStateWithItemAdded = { ...state, itemToEdit: action.payload };
      console.log('ACTIONPAYLOAD', newStateWithItemAdded.itemToEdit);
      return newStateWithItemAdded;

    default:
      return state;
  }
};
const HistoryContextProvider = ({ children }) => {
  const [historyState, dispatch] = useReducer(activityIdToNameReducer, initialActivityIdToNameMap);

  const value = {
    history: historyState,
    dispatch,
  };
  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export default HistoryContextProvider;
