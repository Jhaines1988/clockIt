import React, { useContext } from 'react';
import StopWatch from '../../components/stopWatch/stopwatch';
import { addTimeDataToUserActivities } from '../../db/writeClockitData';
import { onStopWatchFinish } from '../../db/writeClockitData';
import { AuthContext } from '../../store/Auth-Context';

const ClockItScreen = ({ navigation, route }) => {
  let { userId, activityObj, currentActivities } = route.params;
  async function addDataToFirebase(time) {
    let newActivitiesContext = await onStopWatchFinish(
      userId,
      time,
      activityObj,
      currentActivities
    );
    navigation.navigate('Home');
  }
  return <StopWatch addDataToFirebase={addDataToFirebase} name={activityObj.name} />;
};

export default ClockItScreen;
