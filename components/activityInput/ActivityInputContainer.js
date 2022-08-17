import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import ActivityInput from './ActivityInput';
import { addActivityToUserHomeScreen } from '../../db/writeClockitData';
import SaveActivityButton from '../buttons/SaveActivityButton';
import CancelAddActivityButton from '../buttons/CancelAddActivityButton';
import GradientView from '../UI/BackgroundContainer';
function ActivityInputContainer({
  modalVisible,
  onClose,
  userId,
  addingActivitiesToHomeScreenHandler,
}) {
  const [activity, setActivity] = useState('');
  function handleActivityChange(activity) {
    setActivity(activity);
  }

  async function onSaveHandler() {
    try {
      const newActivity = await addActivityToUserHomeScreen(activity, userId);
      setActivity('');
    } catch (error) {
    } finally {
      addingActivitiesToHomeScreenHandler();
      onClose();
    }
  }
  return (
    <Modal animationType="slide" visible={modalVisible} onRequestClose={onClose}>
      <GradientView style={styles.activityInputContainer}>
        <View style={styles.newActivityTextContainer}>
          <Text style={styles.newActivityText}>New Activity</Text>
        </View>
        <ActivityInput
          label="Activity Name"
          textInputConfiguration={{
            onChangeText: handleActivityChange,
            value: activity,
          }}
        />
        <View style={styles.buttonContainer}>
          <CancelAddActivityButton onPress={onClose}>Cancel</CancelAddActivityButton>
          <SaveActivityButton onPress={onSaveHandler}>Save</SaveActivityButton>
        </View>
      </GradientView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  activityInputContainer: { flex: 1 },
  newActivityTextContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  newActivityText: { textAlign: 'center', color: 'white', fontSize: 40 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center' },
});
export default ActivityInputContainer;
