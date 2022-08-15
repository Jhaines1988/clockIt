import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';

import AddButton from '../../components/buttons/AddButton';
import { AuthContext } from '../../store/Auth-Context';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import GradientView from '../../components/UI/BackgroundContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import WeekAndLogoDisplay from '../../components/UI/WeeKAndTitleDisplay';
import useActivitiesSnapShot from '../../hooks/useActivitiesSnapShot';

const HomeScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const [modalVisible, setModalVisible] = useState(false);
  const [addingActivities, setAddingActivities] = useState(false);
  const [usersCurrentActivities, isLoading, weekOf] = useActivitiesSnapShot(
    addingActivities,
    userId
  );
  function addingActivitiesToHomeScreenHandler() {
    setAddingActivities(!addingActivities);
  }
  function startStopAddActivityHandler() {
    setModalVisible(!modalVisible);
  }
  function activityItemPressHandler(item) {
    navigation.navigate('Clockit', {
      userId: userId,
      activityObj: item,
      currentActivities: usersCurrentActivities,
    });
  }
  if (isLoading) {
    return (
      <GradientView>
        <LoadingOverlay message="Cleaning things up.." />
      </GradientView>
    );
  }
  return (
    <GradientView style={styles.container}>
      <WeekAndLogoDisplay weekOf={weekOf.current} />
      <ActivityInputContainer
        userId={userId}
        modalVisible={modalVisible}
        onClose={startStopAddActivityHandler}
        addingActivitiesToHomeScreenHandler={addingActivitiesToHomeScreenHandler}
      />
      <ActivityFlatList
        data={usersCurrentActivities}
        onItemPress={activityItemPressHandler}
        extraData={addingActivities}
        keyExtractor={(item) => item.id}
      />
      <AddButton
        numUserActivities={usersCurrentActivities.length}
        onPress={startStopAddActivityHandler}
      />
    </GradientView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
