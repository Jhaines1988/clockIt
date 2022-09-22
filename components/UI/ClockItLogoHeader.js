import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ClockItLogoHeader = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Clock It</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default ClockItLogoHeader;
