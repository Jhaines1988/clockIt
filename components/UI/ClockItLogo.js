import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ClockItLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Clock It</Text>
      <Image style={styles.logo} source={require('../../assets/clockitIcon.png')} />
      <Text style={styles.logoSubText}>What did you do this week ?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginBottom: 70,
  },
  logoText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 64,
    lineHeight: 87,
    color: 'white',
    textAlign: 'center',
  },
  logoSubText: {
    fontFamily: 'Manrope_300Light',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: 'white',
  },
  logo: { width: 18, height: 18, alignSelf: 'flex-end', marginBottom: 12, marginLeft: 10 },
});

export default ClockItLogo;
