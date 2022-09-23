import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
export const getUserHistoryAsync = createAsyncThunk(
  'userHistory/getUserHistoryAsync',
  async (userId, thunkAPI) => {
    const { id, name } = thunkAPI.getState().userHomeScreen.currentActivityItem;

    try {
      const q = query(
        collection(db, userId, 'History', id.toString()),
        orderBy('startedAt', 'desc'),
        limit(8)
      );
      const history = await getDocs(q);

      const fetchedHistory = [];
      history.forEach((doc) => {
        const newDoc = {
          ...doc.data(),
          startedAt: doc.data().startedAt.toDate().toISOString(),
          endedAt: doc.data().endedAt.toDate().toISOString(),
          name: name,
        };

        fetchedHistory.push(newDoc);
      });

      return { fetchedHistory, activityId: id };
    } catch (error) {
      console.log('ERROR GETTING HISTORY', error);
    }
  }
);

export const userHistory = createSlice({
  name: 'userHistory',
  initialState: {
    currentWeek: [],
  },
  reducers: {
    initializeNames: (state, action) => {
      action.payload.activities.forEach((item) => {
        state[item.id] = { name: item.name, history: [], fullyLoaded: false };
      });
    },
    initializeCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
  },
  extraReducers: {
    [getUserHistoryAsync.fulfilled]: (state, action) => {
      const { fetchedHistory, activityId } = action.payload;
      state[activityId] = {
        history: fetchedHistory,
        fullyLoaded: false,
      };
    },
  },
});

export const { initializeNames, initializeCurrentWeek } = userHistory.actions;

export default userHistory.reducer;
