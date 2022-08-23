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

const ClockItScreen = ({ navigation, route }) => {
  const userCtx = useContext(UserContext);
  const [isFinished, setIsFinished] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [confirmingDeleteModalOpen, setConfirmingDeleteModalOpen] = useState(false);
  const { userId } = route.params;
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

  const renameActivityHandler = () => {
    setEditingModalOpen(false);
    navigation.navigate({
      name: 'RenameActivityScreen',
    });
  };

  async function addDataToFirebase(time) {
    userCtx.currentActivityItem.totalTime += time;
    userCtx.dispatch({ type: 'UPDATE', payload: userCtx.currentActivityItem });
    try {
      await onStopWatchFinish(userId, userCtx.currentActivityItem, userCtx.activities);
    } catch (error) {
      console.log('Error Writing Activity to Firebase', error);
    }
  }
  const deleteActivityHandler = async () => {
    try {
      const deletedSuccess = await deleteItemFromActivitiesList(
        userId,
        userCtx.userActivities,
        userCtx.currentActivityItem.id
      );
      if (deletedSuccess) {
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
        onRenameButtonPress={renameActivityHandler}
        onDeleteButtonPress={openConfirmDeleteModalHandler}
      />
      <FinishedClocking modalVisible={isFinished} onPress={dismissModalHandler} />
      <StopWatch addDataToFirebase={finishedHandler} name={userCtx.currentActivityItem.name} />
    </GradientView>
  );
};

export default ClockItScreen;
