import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ClockItColors } from '../../constants/styles';
import ReusableUIButton from '../buttons/ReusableUIButton';
const EditActivityModal = ({ modalVisible, onPress, onRenameButtonPress, onDeleteButtonPress }) => {
  return (
    <Modal
      visible={modalVisible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.editingModalContainer} onPress={onPress}>
        <View style={styles.editingFunctionContainer}>
          <ReusableUIButton
            onPress={onRenameButtonPress}
            buttonTextContainerStyle={styles.buttonTextContainer}
            buttonStyle={styles.button}
            buttonTextStyle={styles.renameButtonText}>
            Rename activity
          </ReusableUIButton>
          <ReusableUIButton
            onPress={onDeleteButtonPress}
            buttonTextContainerStyle={styles.buttonTextContainer}
            buttonStyle={styles.button}
            buttonTextStyle={styles.deleteButtonText}>
            Delete activity
          </ReusableUIButton>
        </View>
      </Pressable>
    </Modal>
  );
};

export default EditActivityModal;

const styles = StyleSheet.create({
  editingModalContainer: { flex: 1 },
  editingFunctionContainer: {
    flex: 0.15,
    width: '55%',
    marginTop: 90,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginHorizontal: 24,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  renameButtonText: { fontFamily: 'Manrope_500Medium', color: ClockItColors.blue, fontSize: 18 },
  deleteButtonText: {
    fontFamily: 'Manrope_500Medium',
    color: ClockItColors.confirmDelete,
    fontSize: 18,
  },
});
