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
  function openCloseEditHistoryCardModal() {
    setEditHistoryCardModalOpen(!editHistoryCardModalOpen);
  }
  const dateString = `${
    monthMap[weekStart.getMonth()]
  } ${weekStart.getDate()}, ${weekStart.getFullYear()}`;

  function onEditButtonPressHandler() {
    setEditHistoryCardModalOpen(!editHistoryCardModalOpen);
  }
  return (
    <>
      <EditHistoryCard
        modalVisible={editHistoryCardModalOpen}
        onPress={onEditButtonPressHandler}
        week={item.week}
        dateString={dateString}
        totalTime={item.totalTime}
      />
      <DateTimeDisplay dateString={dateString} />
      <View style={cardStyles.cardContainer}>
        <TotalTimeDisplay
          totalTime={item.totalTime}
          onEditButtonPressHandler={onEditButtonPressHandler}
          includeIcon={true}
        />
        <WeeklyDataFlatList week={item.week} />
      </View>
    </>
  );
};

export default HistoryCard;
const cardStyles = StyleSheet.create({
  cardContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 50,
    width: (window.width / 1.13) | 0,
    // maxHeight: (window.width / 5) | 0,
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
});
