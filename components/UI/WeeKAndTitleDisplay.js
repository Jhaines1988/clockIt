import React from 'react';
import { Text, StyleSheet } from 'react-native';

const WeekAndLogoDisplay = ({ weekOf }) => {
  return (
    <>
      <Text style={styles.appTitle}> Clock It </Text>
      <Text style={styles.weekDisplay}> {weekOf} </Text>
    </>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope_400Regular',
    color: 'white',
  },
  weekDisplay: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Manrope_700Bold',
    color: 'white',
  },
});

export default WeekAndLogoDisplay;
