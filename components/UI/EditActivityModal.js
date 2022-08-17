import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ClockItColors } from '../../constants/styles';
import DeleteActivityButton from '../buttons/DeleteActivityButton';
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
          <DeleteActivityButton onPress={onDeleteButtonPress} />
          <ReusableUIButton onPress={onDeleteButtonPress}>Delete</ReusableUIButton>
        </View>
      </Pressable>
    </Modal>
  );
};

export default EditActivityModal;

const styles = StyleSheet.create({
  editingModalContainer: { flex: 1 },
  editingFunctionContainer: {
    flex: 0.18,
    width: '60%',
    marginTop: 90,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginHorizontal: 24,
    borderRadius: 8,
  },
  modalContent: {
    // backgroundColor: 'white',
    // flex: 0.1,
    // marginLeft: 22,
    // marginBottom: 70,
    // width: '50%',
    // borderRadius: 8,
    // shadowColor: '#090A49',
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 16,
  },
});
