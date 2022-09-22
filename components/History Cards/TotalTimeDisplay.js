import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';
import IconButton from '../buttons/IconButton';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
convertCentisecondsToHistoryScreenFormat;
const TotalTimeDisplay = ({
  totalTime,
  onEditButtonPressHandler,
  includeIcon,
  totalContainerStyles,
}) => {
  return (
    <View style={[styles.totalContainer, totalContainerStyles]}>
      <Text style={styles.totalText}>Total </Text>
      <View style={styles.totalAndEditIconContainer}>
        <Text style={[styles.totalText, { fontSize: 18 }]}>
          {convertCentisecondsToHistoryScreenFormat(totalTime)}
        </Text>
        {includeIcon && (
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
        )}
      </View>
    </View>
  );
};

export default TotalTimeDisplay;

const styles = StyleSheet.create({
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
