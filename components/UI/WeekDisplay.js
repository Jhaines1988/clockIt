import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const WeekDisplay = ({ weekOf }) => {
  return (
    <SafeAreaView style={styles.weekDisplayContainer}>
      <Text style={styles.weekDisplay}> {weekOf} </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  weekDisplayContainer: {
    flex: 0.1,
    marginBottom: 50,
    justifyContent: 'center',
  },
  weekDisplay: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Manrope_700Bold',
    color: 'white',
  },
});

export default WeekDisplay;
