import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ActivityLabel = ({ name }) => {
  return (
    <View style={[styles.dateLabelContainer]}>
      <Text style={[styles.dateText]}>Edit {name} Time </Text>
    </View>
  );
};

export default ActivityLabel;

const styles = StyleSheet.create({
  dateLabelContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 38,
    textAlign: 'center',
    fontFamily: 'Manrope_500Medium',
  },
});
