import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ClockItColors } from '../../constants/styles';
import ConfirmDeleteActivityButton from '../buttons/ConfirmDeleteActivityButton';
import CancelDeleteButton from '../buttons/CancelDeleteButton';
import MainUIButton from '../buttons/MainUIButton';
const ConfirmDeleteModal = ({ modalVisible, onCancelPress }) => {
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
              You're about to delete this activity and all its data. This cannot be undone{' '}
            </Text>
          </View>
          <View style={styles.functionContainer}>
            <CancelDeleteButton onPress={onCancelPress} />
            <ConfirmDeleteActivityButton onPress={() => {}} />
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
    // width: '80%',
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
