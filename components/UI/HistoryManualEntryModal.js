import React from 'react';
import { Image, Modal, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ClockItColors } from '../../constants/styles';
import ReusableUIButton from '../buttons/ReusableUIButton';

const HistoryManualEntryModal = ({
  modalVisible,
  onPress,
  currentActivityItem,
  onHistoryButtonPress,
  onManualTimeEntryButtonPress,
}) => {
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      visible={modalVisible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.modalContainer} onPress={onPress}>
        <View style={[styles.modalCenterContainer, { width: width / 1.2, height: height / 4 }]}>
          <View style={styles.modalContent}>
            <View style={styles.activityItemInfoContainer}>
              <Image
                source={require('../../assets/blueClockitIcon.png')}
                style={styles.clockItLogo}
              />
              <Text style={styles.activityItemNameText}>{currentActivityItem.name}</Text>
            </View>

            <ReusableUIButton
              buttonStyle={styles.button}
              buttonTextStyle={styles.manualButtonText}
              buttonTextContainerStyle={styles.buttonTextContainer}
              onPress={onManualTimeEntryButtonPress}>
              Add Time Manually
            </ReusableUIButton>
            <ReusableUIButton
              buttonStyle={styles.button}
              buttonTextStyle={styles.historyButtonText}
              buttonTextContainerStyle={styles.buttonTextContainer}
              onPress={onHistoryButtonPress}>
              Go To History
            </ReusableUIButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default HistoryManualEntryModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: ClockItColors.modalOverlay,
    justifyContent: 'center',
  },
  modalCenterContainer: {
    // flex: 0.5,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
  },
  modalContent: { flex: 1, justifyContent: 'center' },
  activityItemInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockItLogo: { width: 24, height: 24 },
  activityItemNameText: { fontFamily: 'Manrope_600SemiBold', fontSize: 28 },
  buttonTextContainer: {
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  historyButtonText: {
    fontFamily: 'Manrope_500Medium',
    color: ClockItColors.darkestBlue,
    fontSize: 22,
  },
  manualButtonText: {
    fontFamily: 'Manrope_500Medium',
    color: ClockItColors.blue,
    fontSize: 22,
  },
});
