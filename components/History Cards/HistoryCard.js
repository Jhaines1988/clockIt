import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { monthMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
import IconButton from '../buttons/IconButton';

import EditHistoryCard from './EditHistoryCard';
import WeeklyDataFlatList from './WeeklyDataFlatList';
const window = Dimensions.get('window');
const HistoryCard = ({ item }) => {
  const weekStart = new Date(item.startedAt);
  const [editHistoryCardModalOpen, setEditHistoryCardModalOpen] = useState(false);
  function openCloseEditHistoryCardModal() {
    setEditHistoryCardModalOpen(!editHistoryCardModalOpen);
  }

  function onEditButtonPressHandler() {
    setEditHistoryCardModalOpen(!editHistoryCardModalOpen);
  }
  return (
    <>
      <EditHistoryCard
        modalVisible={editHistoryCardModalOpen}
        onPress={onEditButtonPressHandler}
        week={item.week}
      />
      <View style={cardStyles.dateHeading}>
        <Text style={cardStyles.date}>
          {monthMap[weekStart.getMonth()]} {weekStart.getDate()}, {weekStart.getFullYear()}
        </Text>
      </View>
      <View style={cardStyles.cardContainer}>
        <View style={cardStyles.totalContainer}>
          <Text style={cardStyles.totalText}>Total </Text>
          <View style={cardStyles.totalAndEditIconContainer}>
            <Text style={[cardStyles.totalText, { fontSize: 18 }]}>
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
              onPress={onEditButtonPressHandler}
            />
          </View>
        </View>
        <WeeklyDataFlatList week={item.week} />
      </View>
    </>
  );
};
const DateHeading = ({ weekStart }) => {
  return (
    <View style={cardStyles.dateHeading}>
      <Text style={cardStyles.date}>
        {monthMap[weekStart.getMonth()]} {weekStart.getDate()}, {weekStart.getFullYear()}
      </Text>
    </View>
  );
};
export default HistoryCard;
const cardStyles = StyleSheet.create({
  dateHeading: { marginBottom: 8, marginHorizontal: 24 },
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
  date: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
  },
});
