import { useEffect, useState } from 'react';
import { getUserActivities } from '../db/readClockitData';
import { auth } from '.././firebase';
function useGetActivitiesOnMount(setUsersCurrentActivities, setIsLoading, setWeekOf, userId) {
  useEffect(() => {
    const fetchUserActivities = async function () {
      try {
        // const userId = auth.currentUser.uid;
        let userActivities = await getUserActivities(userId);
        if (userActivities) {
          setUsersCurrentActivities(userActivities.activities);
          setWeekOf(userActivities.weekOf);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error in useGetActivitiesOnMount Hook', error);
      }
      fetchUserActivities();
    };
  }, []);
}

export default useGetActivitiesOnMount;
