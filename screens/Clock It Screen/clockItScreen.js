import React, { useState, useEffect } from 'react';

import StopWatch from '../../components/stopWatch/stopwatch';

import { onStopWatchFinish } from '../../db/writeClockitData';
import FinishedClocking from '../../components/UI/FinishedClocking';
import GradientView from '../../components/UI/BackgroundContainer';
const ClockItScreen = ({ navigation, route }) => {
  const [isFinished, setIsFinished] = useState(false);

  const finishedHandler = (time) => {
    setIsFinished(true);
    addDataToFirebase(time);
  };

  const dismissModalHandler = () => {
    setIsFinished(false);
  };

  let { userId, activityObj, currentActivities } = route.params;
  async function addDataToFirebase(time) {
    try {
      await onStopWatchFinish(userId, time, activityObj, currentActivities);
    } catch (error) {
      console.log('Error Writring Activity to Firebase', error);
    }
  }
  return (
    <GradientView>
      <FinishedClocking modalVisible={isFinished} onPress={dismissModalHandler} />
      <StopWatch addDataToFirebase={finishedHandler} name={activityObj.name} />
    </GradientView>
  );
};

export default ClockItScreen;
