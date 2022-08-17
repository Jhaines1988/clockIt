import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const DeleteActivityButton = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>Delete activity</Text>
      </View>
    </Pressable>
  );
};

export default DeleteActivityButton;

const styles = StyleSheet.create({
  button: { backgroundColor: 'pink', flex: 0.5 },
  buttonTextContainer: {},
  buttonText: {},
});
