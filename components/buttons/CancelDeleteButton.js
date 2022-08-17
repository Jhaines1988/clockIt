import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
const CancelDeleteButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
      onPress={onPress}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>Go Back</Text>
      </View>
    </Pressable>
  );
};

export default CancelDeleteButton;

const styles = StyleSheet.create({
  button: { flex: 0.5, backgroundColor: ClockItColors.blue },
  buttonTextContainer: { flex: 1, justifyContent: 'center' },
  buttonText: {
    fontFamily: 'Manrope_500Medium',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1.1,
  },
});
