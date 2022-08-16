import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
const ConfirmDeleteActivityButton = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>Delete activity</Text>
      </View>
    </Pressable>
  );
};

export default ConfirmDeleteActivityButton;

const styles = StyleSheet.create({
  button: { backgroundColor: ClockItColors.confirmDelete, flex: 0.5 },
  buttonTextContainer: { flex: 1, justifyContent: 'center' },
  buttonText: {
    fontFamily: 'Manrope_500Medium',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1.1,
  },
});
