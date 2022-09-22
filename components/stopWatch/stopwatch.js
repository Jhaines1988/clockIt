import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
  FinishButton,
  ResetButton,
} from '../../components/buttons/StopWatchButtons/TimeControlButtons';
import { ClockItColors } from '../../constants/styles';
import displayTime from '../../utils/padNumToTwo';
const ONE_HOUR = 360000;
const StopWatch = ({ addDataToFirebase, name }) => {
  const { width, height } = useWindowDimensions();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);
  const timer = useRef(null);
  const interval = useRef(null);
  const expected = useRef(null);
  const startedAt = useRef(null);

  let tick = () => {
    let drift = Date.now() - expected.current;
    if (drift > interval.current * 10) {
      clearInterval(timer.current);

      let elapsedTime = Date.now() - startedAt.current;

      interval.current = 10;

      expected.current = Date.now() + interval.current;

      setTime(Math.floor(elapsedTime / 10));

      timer.current = setTimeout(() => {
        tick();
      }, 10);
    } else {
      expected.current += interval.current;
      let intervalId = setTimeout(tick, Math.max(0, interval.current - drift));
      timer.current = intervalId;
      setTime((prevTime) => prevTime + 1);
    }
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
        startedAt.current = Date.now();
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
    <View style={[styles.container, { height: height / 1.5 }]}>
      <View style={styles.timeAndStartButtonContainer}>
        <View style={[styles.textContainer, { width: width, marginBottom: height / 20 }]}>
          <Text
            style={[
              styles.timeDisplay,
              {
                width: width,
                marginHorizontal: width * 0.025,
              },
              time >= ONE_HOUR
                ? {
                    paddingRight: width * 0.18,
                    paddingLeft: width * 0.18,
                    fontFamily: 'Manrope_600SemiBold',
                  }
                : { paddingRight: width * 0.25, paddingLeft: width * 0.25 },
            ]}>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  timeAndStartButtonContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  timeDisplay: {
    fontSize: 44,
    fontFamily: 'Manrope_700Bold',
    color: 'white',
  },
  resetFinishContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

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
