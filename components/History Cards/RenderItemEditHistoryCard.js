import React from 'react';
import { StyleSheet, Text, Dimensions, TextInput, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { convertCentisecondsToEditHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { dayMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
const window = Dimensions.get('window');
const RenderItemEditHistoryCard = ({ item, index }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{dayMap[item.date.slice(0, 3)]}</Text>
      </View>
      <View style={styles.textInputAndHoursMinutesTextContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor={ClockItColors.darkestBlue}
            placeholder={convertCentisecondsToEditHistoryScreenFormat(item.time).hours.toString()}
          />
        </View>
        <View style={styles.hoursMinutesTextContainer}>
          <Text style={styles.hoursMinutesText}>h</Text>
        </View>
      </View>
      <View style={styles.textInputAndHoursMinutesTextContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholderTextColor="blue"
            placeholder={convertCentisecondsToEditHistoryScreenFormat(item.time).minutes.toString()}
          />
        </View>
        <View style={styles.hoursMinutesTextContainer}>
          <Text style={styles.hoursMinutesText}>m</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderItemEditHistoryCard;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  dateContainer: {
    flex: 2.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: 16,
    marginRight: 12,
  },
  dateText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    color: ClockItColors.darkestBlue,
    lineHeight: 22,
  },
  textInputAndHoursMinutesTextContainer: {
    marginRight: 16,
    marginTop: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textInputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 4,
  },
  hoursMinutesTextContainer: {
    alignSelf: 'center',
    maxWidth: 70,

    marginLeft: 4,
  },
  input: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    textAlign: 'center',
    width: 50,
    height: 36,
    color: ClockItColors.darkestBlue,
    padding: 2,
  },
});
