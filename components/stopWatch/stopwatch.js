import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import displayTime from '../../utils/padNumToTwo';
import { ClockItColors } from '../../constants/styles';
import {
  FinishButton,
  ResetButton,
} from '../../components/buttons/StopWatchButtons/TimeControlButtons';

const StopWatch = ({ addDataToFirebase, name }) => {
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
    setTime((prevTime) => prevTime + 1);
  };

  const handleResetButtonPress = () => {
    if (interval.current) {
      clearInterval(timer.current);
      interval.current = null;
      expected.current = null;
    }
    setTime(0);
    setRunning(false);
  };

  const handleFinishButtonPress = () => {
    if (!running) {
      addDataToFirebase(time);
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
      <View style={styles.activityInfoContainer}>
        <Text style={styles.clockingLabel}>Clocking</Text>
        <Text style={styles.activityName}>{name}</Text>
      </View>
      <View style={styles.timeAndStartButtonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.timeDisplay}>
            {'  '}
            {displayTime(time)}
          </Text>
        </View>
        <StartButton
          time={time}
          handleStartStopButtonPress={handleStartStopButtonPress}
          running={running}
        />
      </View>
      <View style={styles.resetFinishContainer}>
        <ResetButton time={time} handleResetButtonPress={handleResetButtonPress} />
        <FinishButton
          time={time}
          running={running}
          handleFinishButtonPress={handleFinishButtonPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  activityInfoContainer: {
    alignItems: 'center',

    flex: 1,
    justifyContent: 'center',
  },
  clockingLabel: {
    paddingTop: 55,
    fontSize: 22,
    lineHeight: 25,
    fontFamily: 'Manrope_600SemiBold',
    color: 'white',
  },
  activityName: { fontFamily: 'Manrope_700Bold', color: 'white', fontSize: 44, lineHeight: 55 },
  timeAndStartButtonContainer: {
    flex: 2,
    justifyContent: 'flex-end',

    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 60,
    flex: 1,
    paddingLeft: 40,
    fontFamily: 'Manrope_800ExtraBold',
    color: 'white',
  },
  resetFinishContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 22,
  },
});

function StartButton({ time, handleStartStopButtonPress, running }) {
  return (
    <TouchableOpacity onPress={handleStartStopButtonPress} style={buttonStyles.buttonWrapper}>
      <View style={buttonStyles.buttonTextContainer}>
        <Text style={buttonStyles.buttonText}>{running && time > 0 ? 'Stop' : 'Start'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  buttonWrapper: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTextContainer: {
    borderRadius: 60,
    backgroundColor: ClockItColors.buttonLime,
    flex: 0.7,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 26,
    lineHeight: 38,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: ClockItColors.dkBlue,
    fontWeight: '600',
  },
});

export default StopWatch;
