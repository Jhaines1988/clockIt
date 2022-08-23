import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
import ReusableUIButton from '../buttons/ReusableUIButton';
const ConfirmDeleteModal = ({ modalVisible, onCancelPress, onDeleteButtonPress }) => {
  return (
    <Modal
      visible={modalVisible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.editingModalContainer}>
        <View style={styles.editingWarningAndFunctionContainer}>
          <View style={styles.warningTextContainer}>
            <Text style={styles.headerQuestion}> Are You Sure? </Text>
            <Text style={styles.warningContent}>
              You're about to delete this activity and all its data. This cannot be undone
            </Text>
          </View>
          <View style={styles.functionContainer}>
            <ReusableUIButton
              onPress={onCancelPress}
              buttonStyle={styles.goBackButton}
              buttonTextContainerStyle={styles.buttonTextContainer}
              buttonTextStyle={styles.buttonText}>
              Go Back
            </ReusableUIButton>
            <ReusableUIButton
              onPress={onDeleteButtonPress}
              buttonStyle={styles.deleteButton}
              buttonTextContainerStyle={styles.buttonTextContainer}
              buttonTextStyle={styles.buttonText}>
              Delete activity
            </ReusableUIButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  editingModalContainer: {
    flex: 1,
    backgroundColor: ClockItColors.modalOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editingWarningAndFunctionContainer: {
    flex: 0.3,
    margin: 5,
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  warningTextContainer: { flex: 1, padding: 20 },
  headerQuestion: {
    color: ClockItColors.darkestBlue,
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  warningContent: {
    color: ClockItColors.darkestBlue,
    fontFamily: 'Manrope_400Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  functionContainer: { flex: 0.5, flexDirection: 'row', justifyContent: 'center' },

  buttonTextContainer: { flex: 1, justifyContent: 'center' },

  buttonText: {
    fontFamily: 'Manrope_500Medium',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1.1,
  },
  deleteButton: { backgroundColor: ClockItColors.confirmDelete, flex: 0.5 },

  goBackButton: { backgroundColor: ClockItColors.blue, flex: 0.5 },
});
