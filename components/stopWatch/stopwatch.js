import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Button, Alert, TouchableOpacity } from 'react-native';
import displayTime from '../../utils/padNumToTwo';
import { ClockItColors } from '../../constants/styles';
import { addActivityData } from '../../db/writeClockitData';
import {
  FinishButton,
  ResetButton,
} from '../../components/buttons/StopWatchButtons/TimeControlButtons';

const StopWatch = ({ addDataToFirebase }) => {
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
      console.log('Here');
      console.log('cs to ms', time * 10);
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
    backgroundColor: ClockItColors.darkestBlue,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  timeAndStartButtonContainer: {
    flex: 4,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'relative',
  },
  timeDisplay: {
    // position: 'absolute',
    fontSize: 60,
    flex: 1,
    lineHeight: 82,
    paddingLeft: 40,
    fontWeight: '800',
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
    // flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    bottom: 160,
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

// function ResetButton({ time, running, handleResetButtonPress }) {
//   return (
//     <TouchableOpacity
//       disabled={time > 0 ? false : true}
//       style={time > 0 ? resetButtonStyles.buttonWrapper : finishButtonStyles.buttonWrapper}
//       onPress={handleResetButtonPress}>
//       <View style={resetButtonStyles.buttonTextContainer}>
//         <Text style={resetButtonStyles.buttonText}>Reset</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const resetButtonStyles = StyleSheet.create({
//   buttonWrapper: { flex: 1, backgroundColor: ClockItColors.dkBlue },
//   buttonTextContainer: {},
//   buttonText: {
//     textAlign: 'center',
//     height: 55,
//     color: 'white',
//     fontSize: 20,
//     textTransform: 'uppercase',
//     fontWeight: '600',
//     lineHeight: 28,
//     letterSpacing: 3,
//     padding: 10,
//   },
// });
// function FinishButton({ time, running, handleFinishButtonPress }) {
//   return (
//     <TouchableOpacity
//       disabled={running ? true : false}
//       style={time > 0 ? finishButtonStyles.buttonWrapper : resetButtonStyles.buttonWrapper}
//       onPress={handleFinishButtonPress}>
//       <View style={finishButtonStyles.buttonTextContainer}>
//         <Text style={finishButtonStyles.buttonText}>Finish</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const finishButtonStyles = StyleSheet.create({
//   buttonWrapper: { flex: 1, backgroundColor: ClockItColors.blue },
//   buttonTextContainer: {},
//   buttonText: {
//     textAlign: 'center',
//     height: 55,
//     color: 'white',
//     fontSize: 20,
//     textTransform: 'uppercase',
//     fontWeight: '600',
//     lineHeight: 28,
//     letterSpacing: 3,
//     padding: 10,
//   },
// });
export default StopWatch;
