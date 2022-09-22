import React from 'react';
import { ClockItColors } from '../../../constants/styles';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

export const ResetButton = ({ time, running, handleResetButtonPress }) => {
  const { height, width } = useWindowDimensions();
  return (
    <TouchableOpacity
      disabled={time > 0 ? false : true}
      style={time === 0 ? buttonStyles.disabledButton : buttonStyles.buttonWrapper}
      onPress={handleResetButtonPress}>
      <View style={buttonStyles.buttonTextContainer}>
        <Text style={buttonStyles.buttonText}>Reset</Text>
      </View>
    </TouchableOpacity>
  );
};

export function FinishButton({ time, running, handleFinishButtonPress }) {
  return (
    <TouchableOpacity
      disabled={running || time === 0 ? true : false}
      style={
        !running
          ? time === 0
            ? buttonStyles.disabledButton
            : buttonStyles.buttonWrapper
          : buttonStyles.disabledButton
      }
      onPress={handleFinishButtonPress}>
      <View style={buttonStyles.buttonTextContainer}>
        <Text style={buttonStyles.buttonText}>finish</Text>
      </View>
    </TouchableOpacity>
  );
}
const buttonStyles = StyleSheet.create({
  buttonWrapper: { flex: 0.4, backgroundColor: ClockItColors.dkBlue },
  disabledButton: { flex: 0.4, backgroundColor: ClockItColors.blue, opacity: 0.4 },
  buttonTextContainer: { marginHorizontal: 4, borderWidth: 2 },
  buttonText: {
    textAlign: 'center',
    // height: 55,
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 3,
    padding: 10,
  },
});
