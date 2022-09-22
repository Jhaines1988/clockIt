import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PickerWheelLabel = ({
  label,
  displayState,
  displayStateLabel,
  timeOnSelectedDayLabel,
  timeOnSelectedDay,
}) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{label}</Text>
      {displayState && (
        <Text style={styles.displayStateLabel}>
          {displayStateLabel}
          <Text style={styles.displayState}>{displayState}</Text>
        </Text>
      )}
      {displayState && (
        <Text style={styles.displayStateLabel}>
          {timeOnSelectedDayLabel}
          <Text style={styles.displayState}>{timeOnSelectedDay}</Text>
        </Text>
      )}
    </View>
  );
};

export default PickerWheelLabel;

const styles = StyleSheet.create({
  labelContainer: {
    marginTop: 100,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  labelText: { fontFamily: 'Manrope_600SemiBold', color: 'white', fontSize: 28 },
  displayStateLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
  displayState: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: 'white' },
});
