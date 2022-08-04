import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function ActivityInput({ label, textInputConfiguration }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type Your Activity Here"
        {...textInputConfiguration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 55 },
  label: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  textInput: { backgroundColor: 'pink', padding: 6, borderRadius: 6, fontSize: 18, color: 'black' },
});
export default ActivityInput;
