import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ActivityInput from './ActivityInput';
import Button from '../buttons/Button';
import { addActivityToUserHomeScreen } from '../../db/writeClockitData';
import { AuthContext } from '../../store/Auth-Context';
function ActivityInputContainer({ updateActivityData, setActivityDataOnLoad, userId }) {
  const [activity, setActivity] = useState('');
  function handleActivityChange(activity) {
    setActivity(activity);
  }

  async function onButtonPress() {
    const newActivity = await addActivityToUserHomeScreen(activity, userId);
    // setActivityDataOnLoad((prevState) => {
    //   if (prevState.length) return [...prevState, newActivity];
    //   else return [newActivity];
    // });
    updateActivityData(newActivity);
    setActivity('');
  }
  return (
    <View style={styles.activityInputContainer}>
      <ActivityInput
        textInputConfiguration={{
          onChangeText: handleActivityChange,
          value: activity,
        }}
      />
      <Button onPress={onButtonPress}>Add Activity</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  activityInputContainer: { flex: 1 },
});
export default ActivityInputContainer;
