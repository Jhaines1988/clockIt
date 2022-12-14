import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// components
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import AddButton from '../../components/buttons/AddButton';
import GradientView from '../../components/UI/BackgroundContainer';
import SettingsCog from '../../components/UI/SettingsCog';
import SettingsModal from '../../components/UI/SettingsModal';
import WeekAndLogoDisplay from '../../components/UI/WeeKAndTitleDisplay';

//Helpers
import { getStartOfWeek } from '../../utils/DateTimeHelpers/DateTimeHelpers';
// context
import { AuthContext } from '../../store/Auth-Context';
import { UserContext } from '../../store/User-Context.js';
// hooks

import useFetchUserActivities from '../../hooks/useFetchUserActivities';
import { HistoryContext } from '../../store/History-Context';
import HistoryManualEntryModal from '../../components/UI/HistoryManualEntryModal';
const HomeScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const historyCtx = useContext(HistoryContext);
  const userId = authCtx.userId;
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [addingActivities, setAddingActivities] = useState(false);
  const [historyManualEntryModal, setHistoryManualEntryModal] = useState(false);
  const isLoading = useFetchUserActivities(userId);

  function addingActivitiesToHomeScreenHandler() {
    setAddingActivities(!addingActivities);
  }
  function startStopAddActivityHandler() {
    setModalVisible(!modalVisible);
  }
  function openCloseSettingsModalHandler() {
    setSettingsModalVisible(!settingsModalVisible);
  }

  function openHistoryManualEntryModalHandler(item) {
    userCtx.setCurrentActivityItem(item);
    setHistoryManualEntryModal(true);
  }

  function activityItemPressHandler(item) {
    userCtx.setCurrentActivityItem(item);

    navigation.navigate('Clockit', {
      userId: userId,
    });
  }

  function navigateToHistoryHandler() {
    setHistoryManualEntryModal(false);
    const item = userCtx.currentActivityItem;
    navigation.navigate('HistoryScreen', { name: item.name, id: item.id });
  }

  function navigateToManualInputScreenHandler() {
    setHistoryManualEntryModal(false);
    const item = userCtx.currentActivityItem;
    navigation.navigate('ManualTimeInputScreen', { name: item.name, id: item.id, userId });
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
      <WeekAndLogoDisplay weekOf={getStartOfWeek()} />
      <ActivityInputContainer
        userId={userId}
        modalVisible={modalVisible}
        onClose={startStopAddActivityHandler}
        addingActivitiesToHomeScreenHandler={addingActivitiesToHomeScreenHandler}
      />
      <ActivityFlatList
        data={userCtx.activities}
        onItemPress={activityItemPressHandler}
        onLongItemPress={openHistoryManualEntryModalHandler}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addButtonSettingsContainer}>
        <AddButton
          numUserActivities={userCtx.activities.length}
          onPress={startStopAddActivityHandler}
        />
        <SettingsModal
          modalVisible={settingsModalVisible}
          onPress={openCloseSettingsModalHandler}
          onLogout={authCtx.logout}
        />
        <HistoryManualEntryModal
          modalVisible={historyManualEntryModal}
          onPress={openHistoryManualEntryModalHandler}
          onHistoryButtonPress={navigateToHistoryHandler}
          onManualTimeEntryButtonPress={navigateToManualInputScreenHandler}
          currentActivityItem={userCtx.currentActivityItem}
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
    justifyContent: 'center',
  },
});

export default HomeScreen;
