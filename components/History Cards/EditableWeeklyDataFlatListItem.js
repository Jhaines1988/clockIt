import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ClockItColors } from '../../constants/styles';

const EditableWeeklyDatatFlatListItem = ({ time, date, isEditable }) => {
  return (
    <View style={styles.dateTimeWrapper}>
      <Text style={styles.date}>{date}</Text>
      <TextInput style={styles.time} defaultValue={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  date: {
    fontFamily: 'Manrope_400Regular',

    fontSize: 16,
    color: ClockItColors.darkestBlue,
  },
  time: {
    fontFamily: 'Manrope_400Regular',

    fontSize: 16,
    color: ClockItColors.darkestBlue,
  },
});

export default EditableWeeklyDatatFlatListItem;
