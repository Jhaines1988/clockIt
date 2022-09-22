import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet } from 'react-native';
const PickerWheel = ({ data, onValueChange, selectedValue, style }) => {
  return (
    <Picker
      itemStyle={styles.pickerItem}
      themeVariant="dark"
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        onValueChange(itemValue);
      }}
      style={[styles.picker, style]}>
      {data.map((item, i) => (
        <Picker.Item
          key={item.id}
          label={typeof item.label === 'number' ? item.label.toString() : item.label}
          value={typeof item.value === 'number' ? item.value.toString() : item.value}
        />
      ))}
    </Picker>
  );
};

export default PickerWheel;

const styles = StyleSheet.create({
  picker: { flex: 2, justifyContent: 'center' },
  pickerItem: {
    fontFamily: 'Manrope_400Regular',
    color: 'white',
    fontSize: 28,
  },
});
