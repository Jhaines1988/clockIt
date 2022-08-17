import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ClockItColors } from '../../constants/styles';
import ReusableUIButton from '../buttons/ReusableUIButton';

const EditActivityModal = ({ modalVisible, onPress, onDeleteButtonPress }) => {
  return (
    <Modal
      visible={modalVisible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.editingModalContainer} onPress={onPress}>
        <View style={styles.editingFunctionContainer}>
          <ReusableUIButton onPress={onDeleteButtonPress} style={styles.renameButton}>
            Rename activity
          </ReusableUIButton>
          <ReusableUIButton onPress={onDeleteButtonPress} style={styles.deleteButton}>
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
  deleteButton: {
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonTextContainer: {
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: 'Manrope_500Medium',
      color: ClockItColors.confirmDelete,
      fontSize: 18,
    },
  },
  renameButton: {
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: { fontFamily: 'Manrope_500Medium', color: ClockItColors.blue, fontSize: 18 },
  },
});
