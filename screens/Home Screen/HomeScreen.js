import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';

import AddButton from '../../components/buttons/AddButton';

import { convertCentiSecondsToHMS } from '../../utils/convertCentisecondstoHMS';
import { AuthContext } from '../../store/Auth-Context';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';

import GradientView from '../../components/UI/BackgroundContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';

import useActivitiesSnapShot from '../../hooks/useActivitiesSnapShot';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;

  const [modalVisible, setModalVisible] = useState(false);
  const [addingActivities, setAddingActivities] = useState(false);

  function addingActivitiesToHomeScreenHandler() {
    setAddingActivities(!addingActivities);
  }
  function startStopAddActivityHandler() {
    setModalVisible(!modalVisible);
  }

  return (
    <GradientView style={styles.container}>
      <ActivityInputContainer
        userId={userId}
        modalVisible={modalVisible}
        onClose={startStopAddActivityHandler}
        addingActivitiesToHomeScreenHandler={addingActivitiesToHomeScreenHandler}
      />

      <UserActivityData
        addingActivities={addingActivities}
        startStopAddActivityHandler={startStopAddActivityHandler}
        userId={userId}
      />
    </GradientView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 40,
  },
  listAndButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
const UserActivityData = ({ startStopAddActivityHandler, addingActivities, userId }) => {
  const [usersCurrentActivities, isLoading] = useActivitiesSnapShot(addingActivities, userId);
  const navigation = useNavigation();

  const activityItemPressHandler = (item) => {
    navigation.navigate('Clockit', {
      userId: userId,
      activityObj: item,
      currentActivities: usersCurrentActivities,
    });
  };

  if (isLoading) {
    return <LoadingOverlay message="Cleaning things up.." />;
  }
  return (
    <View style={userActivityStyles.container}>
      <Text style={userActivityStyles.appTitle}> Clock It </Text>
      <Text style={userActivityStyles.weekDisplay}> This Week </Text>
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 22 }}>
        <ActivityFlatList
          data={usersCurrentActivities}
          keyExtractor={(item) => item.id}
          extraData={addingActivities}
          onItemPress={activityItemPressHandler}
        />
        <AddButton
          numUserActivities={usersCurrentActivities.length}
          onPress={startStopAddActivityHandler}
        />
      </SafeAreaView>
    </View>
  );
};

const userActivityStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  appTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope_400Regular',
    color: 'white',
  },
  weekDisplay: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Manrope_700Bold',
    color: 'white',
  },
});

export default HomeScreen;
