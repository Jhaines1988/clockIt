import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import ActivityInput from './ActivityInput';
import { addActivityToUserHomeScreen } from '../../db/writeClockitData';
import GradientView from '../UI/BackgroundContainer';
import ReusableUIButton from '../buttons/ReusableUIButton';
import { ClockItColors } from '../../constants/styles';
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
          <ReusableUIButton
            onPress={onClose}
            buttonStyle={styles.cancelButton}
            buttonTextContainerStyle={styles.buttonTextContainer}
            buttonTextStyle={styles.cancelButtonText}>
            Cancel
          </ReusableUIButton>
          <ReusableUIButton
            onPress={onSaveHandler}
            buttonStyle={styles.saveButton}
            buttonTextContainerStyle={styles.buttonTextContainer}
            buttonTextStyle={styles.saveButtonText}>
            Save
          </ReusableUIButton>
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
  cancelButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 0.4,
    borderRadius: 60,
    height: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    elevation: 2,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 10,
  },
  saveButton: {
    flex: 0.4,
    borderRadius: 60,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: ClockItColors.buttonLime,
    elevation: 2,
    marginLeft: 10,
    borderWidth: 2,
  },
  saveButtonText: {
    textAlign: 'center',
    color: ClockItColors.dkBlue,
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonTextContainer: {},
  buttonContainer: { flexDirection: 'row', justifyContent: 'center' },
});
export default ActivityInputContainer;
