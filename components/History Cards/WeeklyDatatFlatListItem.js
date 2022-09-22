import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { dayMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
const window = Dimensions.get('window');

const WeeklyDataFlatListItem = ({ time, date }) => {
  return (
    <View style={weeklyDataFlatListItemStyles.dateTimeWrapper}>
      <Text style={weeklyDataFlatListItemStyles.date}>{dayMap[date.slice(0, 3)]}</Text>
      <Text style={weeklyDataFlatListItemStyles.time}>
        {convertCentisecondsToHistoryScreenFormat(time)}
      </Text>
    </View>
  );
};

const weeklyDataFlatListItemStyles = StyleSheet.create({
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

export default WeeklyDataFlatListItem;