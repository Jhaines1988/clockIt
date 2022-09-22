import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../app/userHomeScreenInformation';
import { ClockItColors } from '../../constants/styles';
import { addActivityToUserHomeScreen } from '../../db/writeClockitData';
import ReusableUIButton from '../buttons/ReusableUIButton';
import GradientView from '../UI/BackgroundContainer';
import ActivityInput from './ActivityInput';
function ActivityInputContainer({
  modalVisible,
  onClose,
  userId,
  addingActivitiesToHomeScreenHandler,
}) {
  const { height, width } = useWindowDimensions();

  console.log('HEIGHT', (height * 0.05) | 0, 'WIDTH', width);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userHomeScreen);
  const [activity, setActivity] = useState('');
  function handleActivityChange(activity) {
    setActivity(activity);
  }

  async function onSaveHandler() {
    if (activity.trim() === '') {
      Alert.alert('Activities must have a name');
      return;
    }
    if (user.activities.some((item) => item.name === activity)) {
      Alert.alert('Please make your activity names unique');
      setActivity('');
      return;
    }
    try {
      const newActivity = await addActivityToUserHomeScreen(activity, userId);
      dispatch(add(newActivity));
      setActivity('');
    } catch (error) {
      return;
    } finally {
      addingActivitiesToHomeScreenHandler();
      onClose();
    }
  }
  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={modalVisible}
      onRequestClose={onClose}>
      <GradientView>
        <ScrollView
          contentContainerStyle={[styles.scrollView, { paddingVertical: (height * 0.1) | 0 }]}>
          <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="position">
            <View
              style={[
                styles.inputWrapper,
                { width: (width * 0.8) | 0, paddingBottom: (height * 0.05) | 0 },
              ]}>
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
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </GradientView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },

  keyboardAvoidingView: {
    flex: 1,
    alignItems: 'center',
  },
  inputWrapper: { flex: 1, justifyContent: 'center' },
  newActivityTextContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  newActivityText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontFamily: 'Manrope_600SemiBold',
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

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
});
export default ActivityInputContainer;
