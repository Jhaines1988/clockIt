import React, { useContext } from 'react';
import StopWatch from '../../components/stopWatch/stopwatch';
import { UserContext } from '../../store/User-Context';
import { addTimeDataToUserActivities } from '../../db/writeClockitData';
const ClockItScreen = ({ navigation, route }) => {
  const { userId, activityId, activityName } = route.params;
  console.log('clockitScreen', userId, activityId, activityName);
  const userContext = useContext(UserContext);
  // const userId = userContext.uid;
  function addDataToFirebase(time) {
    addTimeDataToUserActivities(activityName, time, userId);
  }
  return <StopWatch addDataToFirebase={addDataToFirebase} />;
};

export default ClockItScreen;
