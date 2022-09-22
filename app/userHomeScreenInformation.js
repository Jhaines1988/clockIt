import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { findDay } from '../unused';

export const getUserActivitiesAsync = createAsyncThunk(
  'userHomeScreenInformation/getUserActivitiesAsync',
  async (userId) => {
    try {
      const docRef = doc(db, userId, 'activities');

      const userActivities = await getDoc(docRef);
      if (userActivities.exists()) {
        const activitiesArray = userActivities.data();

        return activitiesArray.weeklyActivities;
      }
    } catch (error) {
      console.log('error', err);
    }
  }
);
export const updateUserActivitiesAsync = createAsyncThunk(
  'userHomeScreenInformation/updateUserActivitiesAsync',
  async (time, thunkAPI) => {
    try {
      const state = thunkAPI.getState().userHomeScreen;
      let updatedActivity;
      const newActivities = state.activities.map((activity) => {
        if (activity.id === state.currentActivityItem.id) {
          const day = findDay().toDateString();
          const newActivity = { ...activity, totalTime: activity.totalTime + time };
          newActivity[day] ? (newActivity[day] += time) : (newActivity[day] = time);
          updatedActivity = newActivity;
          return newActivity;
        }
        return activity;
      });

      await updateDoc(doc(db, state.userId, 'activities'), {
        weeklyActivities: newActivities,
      });
      return { newActivities, updatedActivity };
    } catch (error) {
      console.log('error', err);
    }
  }
);

export const userHomeScreenInformation = createSlice({
  name: 'userHomeScreenInformation',
  initialState: {
    loaded: false,
    userId: '',
    activities: [],
    currentActivityItem: {},
  },
  reducers: {
    setCurrentActivityItem: (state, action) => {
      state.currentActivityItem = action.payload;
    },
    add: (state, action) => {
      state.activities.push(action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    update: (state, action) => {
      const day = action.payload.day ? action.payload.day : findDay().toDateString();
      state.activities = state.activities.map((activity) => {
        if (activity.id === action.payload.updatedActivity.id) {
          activity.totalTime += action.payload.time;
          activity[day]
            ? (activity[day] += action.payload.time)
            : (activity[day] = action.payload.time);
        }

        return activity;
      });
    },
  },
  extraReducers: {
    [getUserActivitiesAsync.fulfilled]: (state, action) => {
      state.activities = action.payload;
      state.loaded = true;
    },
    [updateUserActivitiesAsync.fulfilled]: (state, action) => {
      state.activities = action.payload.newActivities;
      state.currentActivityItem = action.payload.updatedActivity;
    },
  },
});

export const { increment, add, setUserId, setCurrentActivityItem, update } =
  userHomeScreenInformation.actions;

export default userHomeScreenInformation.reducer;
