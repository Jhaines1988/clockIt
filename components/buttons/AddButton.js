import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const AddButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={require('../../assets/AddButton.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
