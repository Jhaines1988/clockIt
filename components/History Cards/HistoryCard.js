import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { monthMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
import IconButton from '../buttons/IconButton';
import TotalTimeDisplay from './TotalTimeDisplay';
import EditHistoryCard from './EditHistoryCard';
import WeeklyDataFlatList from './WeeklyDataFlatList';
import DateTimeDisplay from './DateTimeDisplay';
const window = Dimensions.get('window');
const HistoryCard = ({ item }) => {
  const weekStart = new Date(item.startedAt);
  const [editHistoryCardModalOpen, setEditHistoryCardModalOpen] = useState(false);

  const dateString = `${
    monthMap[weekStart.getMonth()]
  } ${weekStart.getDate()}, ${weekStart.getFullYear()}`;

  function onEditButtonPressHandler() {
    setEditHistoryCardModalOpen(!editHistoryCardModalOpen);
  }
  return (
    <View style={styles.currentWeekContainer}>
      <EditHistoryCard
        modalVisible={editHistoryCardModalOpen}
        onPress={onEditButtonPressHandler}
        week={item.week}
        dateString={dateString}
        totalTime={item.totalTime}
      />
      <DateTimeDisplay dateString={dateString} />
      <View style={styles.cardContainer}>
        <TotalTimeDisplay
          totalTime={item.totalTime}
          onEditButtonPressHandler={onEditButtonPressHandler}
          includeIcon={true}
        />
        <WeeklyDataFlatList week={item.week} />
      </View>
    </View>
  );
};

export default HistoryCard;
const styles = StyleSheet.create({
  currentWeekContainer: { flex: 1, alignItems: 'start' },
  cardContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 50,
    width: (window.width / 1.13) | 0,
    borderRadius: 8,
  },
});
