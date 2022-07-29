import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import displayTime from '../../utils/padNumToTwo';
import Controls from '../control-buttons/controls';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);
  const timer = useRef(null);
  const interval = useRef(null);
  const expected = useRef(null);

  let tick = () => {
    let drift = Date.now() - expected.current;
    expected.current += interval.current;
    let intervalId = setTimeout(tick, Math.max(0, interval.current - drift));
    timer.current = intervalId;
    setTime((prevTime) => prevTime + 10);
  };

  const handleLapButtonPress = () => {
    if (running) {
      setLap((previousLap) => [time, ...previousLap]);
    } else {
      setLap([]);
      setTime(0);
    }
  };

  const handleStartButtonPress = () => {
    if (!running) {
      if (!interval.current) {
        interval.current = 100;
        expected.current = Date.now() + interval.current;
      }
      setTimeout(() => {
        tick();
      }, 100);
    } else {
      clearInterval(timer.current);
      interval.current = null;
      expected.current = null;
    }
    setRunning((previousRunning) => !previousRunning);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.timeDisplay}> {displayTime(time)}</Text>
      </View>
      <View>
        <Controls
          running={running}
          handleStartButtonPress={handleStartButtonPress}
          handleLapButtonPress={handleLapButtonPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
  },
  timeDisplay: {},
});

export default StopWatch;
