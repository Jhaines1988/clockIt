import { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNames } from '../../app/userHistory';
import { setCurrentActivityItem } from '../../app/userHomeScreenInformation';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import AddButton from '../../components/buttons/AddButton';
import GradientView from '../../components/UI/BackgroundContainer';
import WeekDisplay from '../../components/UI/WeekDisplay';
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
    dispatch(initializeNames({ activities: user.activities }));
    return () => {};
  }, [dispatch]);

  if (!user.loaded) {
    return <LoadingOverlay message="Cleaning things up..." />;
  }
  return (
    <GradientView>
      <WeekDisplay weekOf="This Week" />
      <ActivityInputContainer
        userId={user.userId}
        modalVisible={inputContainerModalVisible}
        onClose={startStopAddActivityHandler}
        addingActivitiesToHomeScreenHandler={addingActivitiesToHomeScreenHandler}
      />
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ActivityFlatList
          data={user.activities}
          onItemPress={onSelectActivity}
          onLongItemPress={() => {}}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.addButtonContainer}>
        <AddButton
          numUserActivities={user.activities.length}
          onPress={startStopAddActivityHandler}
        />
      </View>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1 },
  addButtonContainer: {
    flex: 0.3,
    width: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
