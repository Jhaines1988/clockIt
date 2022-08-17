import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const WeekAndLogoDisplay = ({ weekOf }) => {
  return (
    <SafeAreaView>
      <Text style={styles.appTitle}> Clock It </Text>
      <Text style={styles.weekDisplay}> {weekOf} </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope_400Regular',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  weekDisplay: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Manrope_700Bold',
    color: 'white',
    marginBottom: 64,
  },
});

export default WeekAndLogoDisplay;
