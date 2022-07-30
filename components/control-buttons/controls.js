import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Controls({
  running,
  handleStartStopButtonPress,
  handleLapButtonPress,
  handleFinishButtonPress,
}) {
  return (
    <>
      <TouchableOpacity onPress={handleLapButtonPress} style={styles.buttonWrapper}>
        <View>
          <Text style={styles.buttonText}>{running ? 'lap' : 'reset'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStartStopButtonPress} style={styles.buttonWrapper}>
        <View>
          <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={running ? true : false}
        onPress={handleFinishButtonPress}
        style={styles.buttonWrapper}>
        <View>
          <Text style={styles.buttonText}>Finish</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 110,
  },
  buttonText: {
    color: 'white',
  },
});

export default React.memo(Controls);
