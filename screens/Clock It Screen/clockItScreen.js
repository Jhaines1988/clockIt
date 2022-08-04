import React, { useContext } from 'react';
import StopWatch from '../../components/stopWatch/stopwatch';
import { addTimeDataToUserActivities } from '../../db/writeClockitData';
const ClockItScreen = ({ navigation, route }) => {
  const { userId, activityId, activityName } = route.params;
  function addDataToFirebase(time) {
    addTimeDataToUserActivities(activityName, time, userId);
  }
  return <StopWatch addDataToFirebase={addDataToFirebase} />;
};

export default ClockItScreen;
