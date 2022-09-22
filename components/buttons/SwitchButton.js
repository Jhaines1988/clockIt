import { StyleSheet, Text, View, Switch } from 'react-native';
import React from 'react';
import { ClockItColors } from '../../constants/styles';

const SwitchButton = ({ isEnabled, toggleSwitch, label }) => {
  return (
    <View style={styles.container}>
      <View style={styles.switchLabelContainer}>
        <Text style={styles.switchLabel}>{label}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? ClockItColors.buttonLime : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  switchLabelContainer: {
    flex: 1,
    marginHorizontal: 48,
    alignItems: 'center',
  },
  switchLabel: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
  },
  switchContainer: { flex: 1 },
});
