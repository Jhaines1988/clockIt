import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
import Logout from '../buttons/Logout';

const SettingsModal = ({ modalVisible, onPress, onLogout }) => {
  return (
    <Modal
      visible={modalVisible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.settingsContainer} onPress={onPress}>
        <View style={styles.modalContent}>
          <Logout onPress={onLogout} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: ClockItColors.modalOverlay,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 0.1,
    marginLeft: 22,
    marginBottom: 70,
    width: '50%',
    borderRadius: 8,
    shadowColor: '#090A49',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
  },
});
