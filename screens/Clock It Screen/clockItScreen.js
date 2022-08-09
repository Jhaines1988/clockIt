import React, { useContext } from 'react';
import StopWatch from '../../components/stopWatch/stopwatch';
import { addTimeDataToUserActivities } from '../../db/writeClockitData';
import { onStopWatchFinish } from '../../db/writeClockitData';

import { UserContext } from '../../store/User-Context';
const ClockItScreen = ({ navigation, route }) => {
  const userCtx = useContext(UserContext);
  const { userId, activityObj, currentActivities } = route.params;

  async function addDataToFirebase(time) {
    let newActivitiesContext = await onStopWatchFinish(
      userId,
      time,
      activityObj,
      currentActivities
    );
    userCtx.setUserActivities({ activities: newActivitiesContext });
    navigation.navigate('Home');
  }
  return <StopWatch addDataToFirebase={addDataToFirebase} />;
};

export default ClockItScreen;
