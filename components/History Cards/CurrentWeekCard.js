import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import IconButton from '../../components/buttons/IconButton';
import { ClockItColors } from '../../constants/styles';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { lastSunday } from '../../utils/DateTimeHelpers/DateTimeHelpers';
const window = Dimensions.get('window');
import WeeklyDataFlatList from './WeeklyDataFlatList';
import { dayMap, monthMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
const CurrentWeekCard = ({ item, onEditButtonPressHandler }) => {
  const weekSoFar = Object.keys(item).reduce((acc, key) => {
    if (key !== 'id' && key !== 'name' && key !== 'totalTime') {
      acc.push({ date: key, time: item[key] });
    }
    return acc;
  }, []);
  const weekStart = lastSunday();
  const dayOfWeek = dayMap[weekStart.toDateString().slice(0, 3)];
  const date = weekStart.getDate();
  const month = monthMap[weekStart.getMonth()];
  const year = weekStart.getFullYear();
  return (
    <View style={styles.currentWeekContainer}>
      <Text style={styles.dateHeading}>
        {dayOfWeek}, {month} {date} {year}
      </Text>
      <View style={styles.cardContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total </Text>
          <View style={styles.totalAndEditIconContainer}>
            <Text style={[styles.totalText, { fontSize: 18 }]}>
              {convertCentisecondsToHistoryScreenFormat(item.totalTime)}
            </Text>

            <IconButton
              style={{
                margin: 0,
                borderRadius: 0,
              }}
              icon="md-pencil-sharp"
              color="blue"
              size={24}
              onPress={() => {
                onEditButtonPressHandler(item);
              }}
            />
          </View>
        </View>
        <WeeklyDataFlatList week={weekSoFar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentWeekContainer: { flex: 1, alignItems: 'start' },
  dateHeading: {
    width: '100%',
    marginBottom: 8,
    marginHorizontal: 24,
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
  },
  cardContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 50,
    width: (window.width / 1.13) | 0,
    borderRadius: 8,
  },
  totalContainer: {
    flex: 0.3,
    borderBottomColor: '#D6EFFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    marginHorizontal: 16,
    color: ClockItColors.darkestBlue,
  },
  totalAndEditIconContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  date: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
  },
});

export default CurrentWeekCard;
