import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserActivitiesAsync,
  setCurrentActivityItem,
} from '../../app/userHomeScreenInformation';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import GradientView from '../../components/UI/BackgroundContainer';
import { LargeHeaderStyles, SemiBoldHeaderStyles } from '../../constants/styles';
import WeekAndLogoDisplay from '../../components/UI/WeeKAndTitleDisplay';
import { getStartOfWeek } from '../../unused';
import { initializeNames } from '../../app/userHistory';
import AddButton from '../../components/buttons/AddButton';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userHomeScreen);
  const [inputContainerModalVisible, setInputContainerModalVisible] = useState(false);
  const [addingActivities, setAddingActivities] = useState(false);

  function onSelectActivity(item) {
    dispatch(setCurrentActivityItem(item));
    navigation.navigate('ActivityScreen');
  }
  function addingActivitiesToHomeScreenHandler() {
    setAddingActivities(!addingActivities);
  }
  function startStopAddActivityHandler() {
    setInputContainerModalVisible(!inputContainerModalVisible);
  }
  useEffect(() => {
    // dispatch(getUserActivitiesAsync(user.userId));
    dispatch(initializeNames({ activities: user.activities }));
    return () => {};
  }, [dispatch]);

  // if (!user.loaded) {
  //   return (
  //     <View>
  //       <Text>Hey</Text>
  //     </View>
  //   );
  // }
  return (
    <GradientView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
      {/* <WeekAndLogoDisplay weekOf={getStartOfWeek()} /> */}
      <ActivityInputContainer
        userId={user.userId}
        modalVisible={inputContainerModalVisible}
        onClose={startStopAddActivityHandler}
        addingActivitiesToHomeScreenHandler={addingActivitiesToHomeScreenHandler}
      />
      <Text style={SemiBoldHeaderStyles}> Clock It </Text>
      <Text style={LargeHeaderStyles}> My Activities </Text>
      <ActivityFlatList
        data={user.activities}
        onItemPress={onSelectActivity}
        onLongItemPress={() => {}}
        keyExtractor={(item) => item.id}
      />
      <AddButton numUserActivities={user.activities.length} onPress={startStopAddActivityHandler} />
      {/* </View> */}
    </GradientView>
  );
}

const styles = StyleSheet.create({
  addButtonSettingsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
