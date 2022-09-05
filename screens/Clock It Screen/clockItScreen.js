import React, { useState, useContext, useLayoutEffect } from 'react';
import { Alert } from 'react-native';

// components
import IconButton from '../../components/buttons/IconButton';
import StopWatch from '../../components/stopWatch/stopwatch';
import FinishedClocking from '../../components/UI/FinishedClocking';
import EditActivityModal from '../../components/UI/EditActivityModal';
import GradientView from '../../components/UI/BackgroundContainer';
import ConfirmDeleteModal from '../../components/UI/ConfirmDeleteModal';

// context

import { UserContext } from '../../store/User-Context';
// writing to database

import { onStopWatchFinish } from '../../db/writeClockitData';
import { deleteItemFromActivitiesList } from '../../db/deleteClockitData';
import ManualTimeInput from '../../components/manualTimeInput/ManualTimeInput';

const ClockItScreen = ({ navigation, route }) => {
  const userCtx = useContext(UserContext);
  const [isFinished, setIsFinished] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [confirmingDeleteModalOpen, setConfirmingDeleteModalOpen] = useState(false);
  const [manualTimeInputVisible, setManualTimeInputVisible] = useState(false);

  const { userId } = route.params;
  const editingModalHandler = () => {
    setEditingModalOpen(!editingModalOpen);
  };

  const manualTimeInputVisibleHandler = () => {
    setEditingModalOpen(false);
    setManualTimeInputVisible(!manualTimeInputVisible);
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

  const renameActivityHandler = () => {
    setEditingModalOpen(false);
    navigation.navigate({
      name: 'RenameActivityScreen',
      params: { userId: userId },
    });
  };

  async function addDataToFirebase(time) {
    userCtx.dispatch({
      type: 'UPDATE',
      payload: { updatedActivity: userCtx.currentActivityItem, time },
    });
    try {
      await onStopWatchFinish(userId, userCtx.activities);
    } catch (error) {
      console.log('Error Writing Activity to Firebase', error);
    }
  }
  const deleteActivityHandler = async () => {
    try {
      const updatedArray = await deleteItemFromActivitiesList(
        userId,
        userCtx.activities,
        userCtx.currentActivityItem.id
      );
      if (updatedArray) {
        userCtx.dispatch({ type: 'DELETE', payload: updatedArray });
        closeConfirmDeleteModalHandler();
        Alert.alert('Activity Successfully Deleted');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      }
    } catch (error) {
      console.log('Error Deleting Items', error);
      Alert.alert('Something went wrong deleting your activity...');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    }
  };

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

    return () => {};
  }, [navigation]);
  return (
    <GradientView>
      <ConfirmDeleteModal
        modalVisible={confirmingDeleteModalOpen}
        onCancelPress={closeConfirmDeleteModalHandler}
        onDeleteButtonPress={deleteActivityHandler}
      />
      <EditActivityModal
        modalVisible={editingModalOpen}
        onPress={editingModalHandler}
        onManualEntryButtonPress={manualTimeInputVisibleHandler}
        onRenameButtonPress={renameActivityHandler}
        onDeleteButtonPress={openConfirmDeleteModalHandler}
      />
      <FinishedClocking
        modalVisible={isFinished}
        displayText="Woo! Clocked It!"
        onPress={dismissModalHandler}
        screenToNavigateTo="Home"
      />
      <ManualTimeInput modalVisible={manualTimeInputVisible} />
      <StopWatch addDataToFirebase={finishedHandler} name={userCtx.currentActivityItem.name} />
    </GradientView>
  );
};

export default ClockItScreen;
