import React, { useState, useLayoutEffect } from 'react';
import IconButton from '../../components/buttons/IconButton';
import StopWatch from '../../components/stopWatch/stopwatch';

import { onStopWatchFinish } from '../../db/writeClockitData';
import FinishedClocking from '../../components/UI/FinishedClocking';
import EditActivityModal from '../../components/UI/EditActivityModal';

import GradientView from '../../components/UI/BackgroundContainer';
import ConfirmDeleteModal from '../../components/UI/ConfirmDeleteModal';
const ClockItScreen = ({ navigation, route }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [confirmingDeleteModalOpen, setConfirmingDeleteModalOpen] = useState(false);

  let { userId, activityObj, currentActivities } = route.params;

  const editingModalHandler = () => {
    setEditingModalOpen(!editingModalOpen);
  };

  const openConfirmDeleteModalHandler = () => {
    setEditingModalOpen(false);
    setConfirmingDeleteModalOpen(true);
  };
  const closeConfirmDeleteModalHandler = () => {
    setConfirmingDeleteModalOpen(false);
  };
  const finishedHandler = (time) => {
    setIsFinished(true);
    addDataToFirebase(time);
  };

  const dismissModalHandler = () => {
    setIsFinished(false);
  };

  async function addDataToFirebase(time) {
    try {
      await onStopWatchFinish(userId, time, activityObj, currentActivities);
    } catch (error) {
      console.log('Error Writring Activity to Firebase', error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="ellipsis-vertical-outline"
          color="white"
          size={24}
          onPress={editingModalHandler}
        />
      ),
    });

    return () => {
      // second;
    };
  }, [navigation]);
  return (
    <GradientView>
      <ConfirmDeleteModal
        modalVisible={confirmingDeleteModalOpen}
        onCancelPress={closeConfirmDeleteModalHandler}
      />
      <EditActivityModal
        modalVisible={editingModalOpen}
        onPress={editingModalHandler}
        onDeleteButtonPress={openConfirmDeleteModalHandler}
      />
      <FinishedClocking modalVisible={isFinished} onPress={dismissModalHandler} />
      <StopWatch addDataToFirebase={finishedHandler} name={activityObj.name} />
    </GradientView>
  );
};

export default ClockItScreen;
