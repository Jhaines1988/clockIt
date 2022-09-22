import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DatesLabel = ({ itemHeight }) => {
  return (
    <SafeAreaView style={[styles.dateLabelContainer]}>
      {/* <View style={[styles.dateLabelContainer, { height: itemHeight }]}> */}
      <Text style={[styles.dateText, { width: itemHeight * 2.5 }]}>Pick A Date</Text>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default DatesLabel;

const styles = StyleSheet.create({
  dateLabelContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 12,
  },
  dateText: {
    color: 'white',
    fontSize: 38,
    textAlign: 'center',
    fontFamily: 'Manrope_500Medium',
  },
});
