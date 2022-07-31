import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatch from '../../components/stopWatch/stopwatch';
const ClockItScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StopWatch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ClockItScreen;
