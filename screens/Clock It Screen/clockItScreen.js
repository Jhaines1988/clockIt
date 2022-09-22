import React, { useContext, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';

// components
import IconButton from '../../components/buttons/IconButton';
import StopWatch from '../../components/stopWatch/stopwatch';
import GradientView from '../../components/UI/BackgroundContainer';
import ConfirmDeleteModal from '../../components/UI/ConfirmDeleteModal';
import EditActivityModal from '../../components/UI/EditActivityModal';
import FinishedClocking from '../../components/UI/FinishedClocking';

// context

import { UserContext } from '../../store/User-Context';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { update, updateUserActivitiesAsync } from '../../app/userHomeScreenInformation';
// writing to database

import { deleteItemFromActivitiesList } from '../../db/deleteClockitData';
import { onStopWatchFinish } from '../../db/writeClockitData';

const ClockItScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.userHomeScreen);
  const history = useSelector((state) => state.userHistory);
  const dispatch = useDispatch();
  const userCtx = useContext(UserContext);
  const [isFinished, setIsFinished] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [confirmingDeleteModalOpen, setConfirmingDeleteModalOpen] = useState(false);

  const userId = user.userId;
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
      params: { userId: userId },
    });
  };

  async function addDataToFirebase(time) {
    // console.log('ADDING TIME', time);
    // userCtx.dispatch({
    //   type: 'UPDATE',
    //   payload: { updatedActivity: user.currentActivityItem, time },
    // });

    // dispatch(update({ updatedActivity: user.currentActivityItem, time }));
    try {
      dispatch(updateUserActivitiesAsync(time));
      // await onStopWatchFinish(userId, user.activities);
    } catch (error) {
      console.log('Error Writing Activity to Firebase', error);
    }
  }
  const deleteActivityHandler = async () => {
    try {
      const updatedArray = await deleteItemFromActivitiesList(
        userId,
        user.activities,
        user.currentActivityItem.id
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
      // headerRight: () => (
      //   <IconButton
      //     icon="ellipsis-vertical-outline"
      //     color="white"
      //     size={24}
      //     onPress={editingModalHandler}
      //   />
      // ),

      headerTitle: `Clocking ${user.currentActivityItem.name}`,
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
      <FinishedClocking
        modalVisible={isFinished}
        displayText="Woo! Clocked It!"
        onPress={dismissModalHandler}
        screenToNavigateTo="Home"
      />

      <StopWatch addDataToFirebase={finishedHandler} name={user.currentActivityItem.name} />
    </GradientView>
  );
};

export default ClockItScreen;
