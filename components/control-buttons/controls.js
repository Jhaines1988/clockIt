import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Controls({ running, handleStartButtonPress, handleLapButtonPress }) {
  return (
    <>
      <TouchableOpacity onPress={handleLapButtonPress}>
        <View>
          <Text>{running ? 'lap' : 'Reset'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStartButtonPress}>
        <View>
          <Text>{running ? 'stop' : 'Start'}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default React.memo(Controls);
