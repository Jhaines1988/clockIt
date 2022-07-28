import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text> Hey There ! Welcome to the Home Screen </Text>
      <Button
        title='Go To Clock It Screen'
        onPress={() => navigation.navigate('ClockIt')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
});

export default HomeScreen;
