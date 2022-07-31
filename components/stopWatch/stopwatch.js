import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import displayTime from '../../utils/padNumToTwo';
import Controls from '../control-buttons/controls';
import { addActivityData } from '../../db/writeClockitData';
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);
  const [activityTime, setActivityTime] = useState('');
  const timer = useRef(null);
  const interval = useRef(null);
  const expected = useRef(null);

  let tick = () => {
    let drift = Date.now() - expected.current;
    expected.current += interval.current;
    let intervalId = setTimeout(tick, Math.max(0, interval.current - drift));
    timer.current = intervalId;
    setTime((prevTime) => prevTime + 1);
  };

  const handleLapButtonPress = () => {
    if (running) {
      setLap((previousLap) => [time, ...previousLap]);
    } else {
      setLap([]);
      setTime(0);
    }
  };

  const handleFinishButtonPress = () => {
    if (!running) {
      addActivityData('bike', time);
    }
  };
  const handleStartStopButtonPress = () => {
    if (!running) {
      if (!interval.current) {
        interval.current = 10;
        expected.current = Date.now() + interval.current;
      }
      setTimeout(() => {
        tick();
      }, 10);
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
        <Text style={styles.timeDisplay} numberOfLines={1}>
          {'  '}
          {displayTime(time)}
        </Text>
      </View>
      <View style={styles.controlsContainer}>
        <Controls
          running={running}
          handleStartStopButtonPress={handleStartStopButtonPress}
          handleLapButtonPress={handleLapButtonPress}
          handleFinishButtonPress={handleFinishButtonPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 200,
  },
  timeDisplay: {
    fontSize: 12,
    letterSpacing: 7,
    lineHeight: 150,
    margin: 40,
    padding: 40,
  },
  controlsContainer: { flex: 1, backgroundColor: 'purple' },
});

export default StopWatch;
