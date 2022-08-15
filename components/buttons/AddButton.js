import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

const AddButton = ({ onPress, numUserActivities }) => {
  const handleButtonPress = () => {
    if (numUserActivities === 6) {
      Alert.alert('Sorry! You Have reached the maximum number of activities to track');
    } else {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="addButton" style={styles.button} onPress={handleButtonPress}>
        <Image style={styles.image} source={require('../../assets/AddButton.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default AddButton;
