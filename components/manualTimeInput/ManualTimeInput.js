import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { updateUserActivities } from '../../db/writeClockitData';
import { UserContext } from '../../store/User-Context';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils//DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { generateWeekForFlatList } from '../../utils/DateTimeHelpers/DateTimeHelpers';
import { findDay } from '../../utils/DateTimeHelpers/getDay';
import { createHours, createMinutes } from '../../utils/Manual-Input-Helpers/createMinutes';
import { manualTimeEntryConverter } from '../../utils/manualTimeEntryConverter';
import ReusableUIButton from '../buttons/ReusableUIButton';
import SwitchButton from '../buttons/SwitchButton';
import PickerWheel from '../Picker/PickerWheel';
import PickerWheelLabel from '../Picker/PickerWheelLabel';
import GradientView from '../UI/BackgroundContainer';
import ActivityLabel from './ActivityLabel';

const minutes = createMinutes();
const ManualTimeInput = ({ name, id, userId }) => {
  const userCtx = useContext(UserContext);
  const dates = generateWeekForFlatList(findDay(), id);
  const hours = createHours();
  const [selectedDate, setSelectedDate] = useState(findDay().toDateString());

  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const navigation = useNavigation();
  const [addingToggleSwitch, setAddingToggleSwitch] = useState(true);
  const [editingToggleSwitch, setEditingToggleSwitch] = useState(false);

  const toggleSwitchHandler = () => {
    setEditingToggleSwitch((previousState) => !previousState);
    setAddingToggleSwitch((previousState) => !previousState);
  };

  async function writeDataToFireBase() {
    const time = manualTimeEntryConverter({ hours: hoursInput, minutes: minutesInput });
    if (addingToggleSwitch) {
      userCtx.dispatch({
        type: 'UPDATE',
        payload: { updatedActivity: userCtx.currentActivityItem, time, day: selectedDate },
      });
      try {
        await updateUserActivities(userId, userCtx.activities);
        setHoursInput(0);
        setMinutesInput(0);
      } catch (error) {
        console.log('Error in Write Data to Firebase', error);
      }
    } else {
      userCtx.dispatch({
        type: 'UPDATE',
        payload: {
          updatedActivity: userCtx.currentActivityItem,
          time,
          day: selectedDate,
          edit: true,
        },
      });
      try {
        await updateUserActivities(userId, userCtx.activities);
        setHoursInput(0);
        setMinutesInput(0);
      } catch (error) {
        console.log('Error in Write Data to Firebase', error);
      }
    }
  }

  function onDatePickerValueChange(selectedDate) {
    setSelectedDate(selectedDate);
  }

  function onHourPickerValueChange(selectedHour) {
    setHoursInput(selectedHour);
  }
  function onMinutePickerValueChange(selectedMinute) {
    setMinutesInput(selectedMinute);
  }

  return (
    <GradientView
      style={
        {
          // justifyContent: 'flex-start',
          // alignItems: 'stretch',
        }
      }>
      <ActivityLabel action={''} name={name} />
      <View
        style={{
          flex: 1,

          justifyContent: 'flex-end',
          alignItems: 'center',
        }}></View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxHeight: 70,
          justifyContent: 'center',
        }}>
        <PickerWheel
          data={dates}
          onValueChange={onDatePickerValueChange}
          selectedValue={selectedDate}
        />
      </View>
      <PickerWheelLabel
        label={addingToggleSwitch ? 'Add Time' : 'Enter new time '}
        displayStateLabel="Total time this week: "
        displayState={convertCentisecondsToHistoryScreenFormat(
          userCtx.currentActivityItem.totalTime
        )}
        timeOnSelectedDayLabel={`Total time on ${selectedDate.slice(0, -4)}: `}
        timeOnSelectedDay={
          convertCentisecondsToHistoryScreenFormat(userCtx.currentActivityItem[selectedDate]) || 0
        }
      />

      <View style={styles.outerHoursMinutesContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              maxHeight: 80,
              justifyContent: 'center',
            }}>
            <PickerWheel
              data={hours}
              onValueChange={onHourPickerValueChange}
              selectedValue={hoursInput}
            />
            <View style={styles.hoursMinutesLabelTextContainer}>
              <Text style={styles.hoursMinutesLabelText}>h</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              maxHeight: 80,
              justifyContent: 'center',
            }}>
            <PickerWheel
              data={minutes}
              onValueChange={onMinutePickerValueChange}
              selectedValue={minutesInput}
            />
            <View style={styles.hoursMinutesLabelTextContainer}>
              <Text style={styles.hoursMinutesLabelText}>m</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 66 }}>
        <SwitchButton
          isEnabled={addingToggleSwitch}
          toggleSwitch={toggleSwitchHandler}
          label="Add Time"
        />
        <SwitchButton
          isEnabled={editingToggleSwitch}
          toggleSwitch={toggleSwitchHandler}
          label="Enter new time"
        />
      </View>
      <View style={styles.saveButtonContainer}>
        <ReusableUIButton
          buttonStyle={styles.buttonStyle}
          buttonTextContainerStyle={styles.buttonTextContainerStyle}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={writeDataToFireBase}>
          Save
        </ReusableUIButton>
      </View>
    </GradientView>
  );
};
const styles = StyleSheet.create({
  manualTimeInputContainer: {
    flex: 0.4,
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  outerHoursMinutesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 80,
  },

  hoursMinutesLabelTextContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoursMinutesLabelText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: 'white',
  },
  saveButtonContainer: { flex: 2.5, justifyContent: 'center', alignItems: 'center' },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    backgroundColor: ClockItColors.buttonLime,
    width: 262,
    maxWidth: 262,
    borderRadius: 60,
  },
  buttonTextContainerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonTextStyle: {
    fontFamily: 'Manrope_600SemiBold',
    color: ClockItColors.dkBlue,
    fontSize: 28,
  },
});

export default ManualTimeInput;

/*
  async function updateActivitiesOlderThanThisWeek(dateFromUserInput, time) {
    try {
      const dateId = dateFromUserInput.toISOString();
      const dayOfWeekToUpdate = new Date(dateInput).getDay();
      await updateUserActivitiesFromManualInput(
        userId,
        userCtx.currentActivityItem.id,
        dateId,
        dayOfWeekToUpdate,
        time
      );
    } catch (error) {
      console.log('Error In manaul Time input writing data to firebase, second catcch', error);
    }
  }



*/
