import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import AddButton from '../../components/buttons/AddButton';
import { AuthContext } from '../../store/Auth-Context';
import { UserContext } from '../../store/User-Context.js';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import GradientView from '../../components/UI/BackgroundContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import WeekAndLogoDisplay from '../../components/UI/WeeKAndTitleDisplay';
import useActivitiesSnapShot from '../../hooks/useActivitiesSnapShot';
import SettingsCog from '../../components/UI/SettingsCog';
import SettingsModal from '../../components/UI/SettingsModal';

const HomeScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const userId = authCtx.userId;
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [addingActivities, setAddingActivities] = useState(false);

  const [usersCurrentActivities, isLoading, weekOf] = useActivitiesSnapShot(userId);

  function addingActivitiesToHomeScreenHandler() {
    setAddingActivities(!addingActivities);
  }
  function startStopAddActivityHandler() {
    setModalVisible(!modalVisible);
  }
  function openCloseSettingsModalHandler() {
    setSettingsModalVisible(!settingsModalVisible);
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
        extraData={userCtx.userActivities}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addButtonSettingsContainer}>
        <AddButton
          numUserActivities={usersCurrentActivities.length}
          onPress={startStopAddActivityHandler}
        />
        <SettingsModal
          modalVisible={settingsModalVisible}
          onPress={openCloseSettingsModalHandler}
          onLogout={authCtx.logout}
        />
        <SettingsCog onPress={openCloseSettingsModalHandler} />
      </View>
    </GradientView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonSettingsContainer: {
    flex: 1,
    width: '100%',
  },
});

export default HomeScreen;
