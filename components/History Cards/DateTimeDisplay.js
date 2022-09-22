import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';

const DateTimeDisplay = ({ dateString, containerStyle, dateStyle }) => {
  return (
    <View style={[styles.dateHeading, containerStyle]}>
      <Text style={[styles.date, dateStyle]}>{dateString}</Text>
    </View>
  );
};

export default DateTimeDisplay;

const styles = StyleSheet.create({
  dateHeading: { marginBottom: 8, marginHorizontal: 24 },
  date: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
});
