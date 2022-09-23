import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import TotalTimeDisplay from './TotalTimeDisplay';
import WeeklyDataFlatList from './WeeklyDataFlatList';

import DateTimeDisplay from './DateTimeDisplay';
import { currentWeekFormatter, weekStartHeadingGenerator } from './helpers/currentWeekHelper';

import { useDispatch } from 'react-redux';
import { initializeCurrentWeek } from '../../app/userHistory';

const CurrentWeekCard = ({ item }) => {
  const { width } = useWindowDimensions();
  const currentWeek = currentWeekFormatter(item);
  const weekStartHeading = weekStartHeadingGenerator();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeCurrentWeek({ currentWeek }));
  });
  return (
    <View style={styles.currentWeekContainer}>
      <DateTimeDisplay dateString={weekStartHeading} />
      <View style={[styles.cardContainer, { width: (width / 1.13) | 0 }]}>
        <TotalTimeDisplay
          totalTime={item.totalTime}
          includeIcon={true}
          onEditButtonPressHandler={() => {}}
        />
        <WeeklyDataFlatList week={currentWeek} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentWeekContainer: { flex: 1, alignItems: 'start' },
  cardContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 50,
    borderRadius: 8,
  },
});

export default CurrentWeekCard;
