import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function ActivityInput({ label, textInputConfiguration }) {
  return (
    <View style={[styles.textInputContainer]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        style={[styles.textInput]}
        placeholder="Type Your Activity Here"
        {...textInputConfiguration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: { flex: 0.2, marginTop: 50, marginBottom: 20, alignItems: 'flex-start' },
  label: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 27,
    textAlign: 'center',
  },
  textInput: {
    flex: 0.3,
    width: 330,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
    fontSize: 18,
    color: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid',
  },
});
export default ActivityInput;
