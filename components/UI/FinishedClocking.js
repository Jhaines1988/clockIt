import React from 'react';
import { View, Text, Image, Modal, StyleSheet, Button } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
const FinishedClocking = ({ modalVisible, displayText, onPress }) => {
  const navigation = useNavigation();
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      presentationStyle="overFullScreen"
      onDismiss={() => {
        navigation.navigate('Home');
      }}>
      <View style={styles.finishedContainer}>
        <View style={styles.modalTextIconContainer}>
          <Image style={styles.clockitIcon} source={require('../../assets/blueClockitIcon.png')} />
          <Text style={styles.finishedText}> {displayText}</Text>
          <Button title="Ok " onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  finishedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 5, 115, 0.6)',
  },
  modalTextIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '23%',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#090A49',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    marginBottom: 28,
  },
  clockitIcon: { width: 30, height: 30 },
  finishedText: {
    paddingTop: 15,
    fontSize: 20,
    fontFamily: 'Manrope_400Regular',
    color: ClockItColors.darkestBlue,
  },
});

export default FinishedClocking;
