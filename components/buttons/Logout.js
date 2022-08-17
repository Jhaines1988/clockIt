import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
const Logout = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>Logout</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 22 },
  buttonTextContainer: { flex: 1, justifyContent: 'center' },
  buttonText: {
    color: ClockItColors.darkestBlue,
    fontFamily: 'Manrope_400Regular',
    fontSize: 18,
    letterSpacing: 1.2,
  },
});
export default Logout;
