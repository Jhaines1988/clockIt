import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MainHeader = ({ headerText, headerContainerStyle, headerTextStyle }) => {
  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: { justifyContent: 'center', alignItems: 'center' },
  headerText: { fontFamily: 'Manrope_700Bold', fontSize: 48 },
});
