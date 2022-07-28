import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClockItScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text> Welcome To The ClockIt Screen!</Text>
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
