import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import { getUserDataOnMount } from '../../db/readClockitData';
import { deleteItemFromActivitiesList } from '../../db/deleteClockitData';

const HomeScreen = ({ navigation, route }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [activityDataOnLoad, setActivityDataOnLoad] = useState([]);
  const updatedActivityData = useRef(null);
  const userId = useRef(route.params.userID);

  useEffect(() => {
    getUserData();
  }, [updatedActivityData.current]);

  const updateActivityData = function (activity) {
    if (activityDataOnLoad.length) {
      setActivityDataOnLoad((prevState) => [...prevState, activity]);
    } else {
      setActivityDataOnLoad(activity);
    }
    updatedActivityData.current = activityDataOnLoad;
  };

  async function getUserData() {
    try {
      let fetchedUserActivityData = await getUserDataOnMount(userId.current);
      if (fetchedUserActivityData) {
        setActivityDataOnLoad(fetchedUserActivityData);
        updatedActivityData.current = fetchedUserActivityData;
      }
    } catch (error) {
      console.log('Error Getting User Data: Handle In HomeScreenjs func getUserData()', error);
    }
  }
  const deleteActivityData = function () {
    const newActivityData = deleteItemFromActivitiesList(
      userId.current,
      updatedActivityData.current,
      selectedId
    );
    setActivityDataOnLoad((previousState) => newActivityData);
    updatedActivityData.current = newActivityData;
  };

  return (
    <View style={styles.container}>
      <ActivityInputContainer
        setActivityDataOnLoad={setActivityDataOnLoad}
        updateActivityData={updateActivityData}
        userId={userId.current}
      />
      <ActivityFlatList
        data={activityDataOnLoad}
        keyExtractor={(item) => item.id}
        extraData={updatedActivityData.current}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setSelectedName={setSelectedName}
      />
      <Button
        title="Clock It With Selected Data"
        onPress={() =>
          navigation.navigate('ClockIt', {
            userId: userId.current,
            activityId: selectedId,
            activityName: selectedName,
          })
        }
      />
      <Button title="Delete SelectedItem" onPress={deleteActivityData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
export default HomeScreen;
