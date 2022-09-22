import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

function ActivityInput({ label, textInputConfiguration }) {
  return (
    <View style={[styles.textInputContainer]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        style={[styles.textInput]}
        placeholder="Type Your Activity Here"
        placeholderTextColor="gray"
        {...textInputConfiguration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Manrope_600SemiBold',
    marginBottom: 4,
    lineHeight: 27,
    textAlign: 'center',
  },
  textInput: {
    flex: 0.4,
    width: '100%',
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
