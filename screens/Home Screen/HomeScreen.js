import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
    paddingTop: 40,
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityFlatList
          data={usersCurrentActivities}
          keyExtractor={(item) => item.id}
          extraData={addingActivities}
          onItemPress={activityItemPressHandler}
        />
        <AddButton onPress={startStopAddActivityHandler} />
      </View>
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
// const UserActivityData = () => {
//   const userCtx = useContext(UserContext);
//   const [usersCurrentActivities, setUsersCurrentActivities] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [weekOf, setWeekOf] = useState('');
//   useEffect(() => {
//     async function fetchUserActivities() {
//       try {
//         let userActivities = await getUserActivities(userCtx.userId);
//         if (userActivities) {
//           console.log(userCtx);
//           setUsersCurrentActivities(userActivities.activities);
//           setIsLoading(false);
//           setWeekOf(userActivities.weekOf);
//         }
//       } catch (error) {}
//     }
//     fetchUserActivities();
//   }, []);
//   if (isLoading) {
//     return <LoadingOverlay message="Cleaning things up.." />;
//   }
//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <Text> Week Of:{weekOf} </Text>
//       {/*
//       <SafeAreaView style={{ flex: 1 }}>
//         <FlatList
//           data={usersCurrentActivities}
//           renderItem={({ item }) => {
//             return (
//               <TouchableOpacity>
//                 <Text style={{ color: 'black', fontSize: 32 }}>
//                   {item.name}: {convertCentiSecondsToHMS(item.totalTime)}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//           keyExtractor={(item) => item.id}
//           // extraData={userActivities}
//         />
//       </SafeAreaView> */}
// {/*
//       <ActivityInputContainer userId={userCtx.userId} /> */}
//     </View>
//   );
// };

/*

  return (
    <UserContext.Consumer>
      {({ userActivities, startOfWeek, endOfWeek }) => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SafeAreaView>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
          </SafeAreaView>

          <Button
            title="Clock It With Selected Data"
            onPress={() =>
              navigation.navigate('ClockIt', {
                userId: userId,
                activityObj: selectedItem,
                currentActivities: userActivities.slice(),
              })
            }
          />
          <Text style={{ color: 'black', fontSize: 22, flex: 1 }}>
            {new Date(startOfWeek).toLocaleDateString()} -{' '}
            {new Date(endOfWeek).toLocaleDateString()}
          </Text>
        </View>
      )}
    </UserContext.Consumer>
  );
*/

// const HomeScreen = ({ navigation, route }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedName, setSelectedName] = useState(null);
//   const [activityDataOnLoad, setActivityDataOnLoad] = useState([]);
//   const updatedActivityData = useRef(null);
//   const userId = useRef(route.params.userID);

//   useEffect(() => {
//     // getUserData();
//     return () => {
//       getTimeActivityData();
//     };
//   }, [updatedActivityData.current]);

//   const updateActivityData = function (activity) {
//     if (activityDataOnLoad.length) {
//       setActivityDataOnLoad((prevState) => [...prevState, activity]);
//     } else {
//       setActivityDataOnLoad(activity);
//     }
//     updatedActivityData.current = activityDataOnLoad;
//   };

//   async function getUserData() {
//     try {
//       let fetchedUserActivityData = await getUserDataOnMount(userId.current);
//       if (fetchedUserActivityData) {
//         setActivityDataOnLoad(fetchedUserActivityData);
//         updatedActivityData.current = fetchedUserActivityData;
//       }
//     } catch (error) {
//       console.log('Error Getting User Data: Handle In HomeScreenjs func getUserData()', error);
//     }
//   }
//   const deleteActivityData = function () {
//     const newActivityData = deleteItemFromActivitiesList(
//       userId.current,
//       updatedActivityData.current,
//       selectedId
//     );
//     setActivityDataOnLoad((previousState) => newActivityData);
//     updatedActivityData.current = newActivityData;
//   };

//   return (
//     <View style={styles.container}>
//       <ActivityInputContainer
//         setActivityDataOnLoad={setActivityDataOnLoad}
//         updateActivityData={updateActivityData}
//         userId={userId.current}
//       />
//       <ActivityFlatList
//         data={activityDataOnLoad}
//         keyExtractor={(item) => item.id}
//         extraData={updatedActivityData.current}
//         selectedId={selectedId}
//         setSelectedId={setSelectedId}
//         setSelectedName={setSelectedName}
//       />
//       <Button
//         title="Clock It With Selected Data"
//         onPress={() =>
//           navigation.navigate('ClockIt', {
//             userId: userId.current,
//             activityId: selectedId,
//             activityName: selectedName,
//           })
//         }
//       />
//       <Button title="Delete SelectedItem" onPress={deleteActivityData} />
//     </View>
//   );
// };

export default HomeScreen;
/*

FLATLIST COMPONENT

const Item = ({ item, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {item.name} : {convertCentiSecondsToHMS(item.totalTime)}
      </Text>
    </TouchableOpacity>
  );
};

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedName(item.name);
          setSelectedItem(item);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };



  //// ON ADD

  NOT USED CURRENTLY

  const onStopWatchFinish = async (timeFromStopWatch) => {
    const totalTime = 1000;
    let currentActivitiesSlice = userActivities.slice();
    const indexOfSelectedItem = userActivities.indexOf(selectedItem);
    currentActivitiesSlice[indexOfSelectedItem].totalTime += totalTime;
    const updatedActivity = currentActivitiesSlice[indexOfSelectedItem];
    setUserActivities((prevState) => currentActivitiesSlice);

    try {
      await updateActivityTimeOnFinish(userId, updatedActivity);
      await updateUserActivities(userId, userActivities);
    } catch (error) {
      console.log('Error in "onStopWatchFinish":', error);
    }
  };

   <SafeAreaView>
            <FlatList
              data={userActivities}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={userActivitiesRef.current}
            />

            <Button
              onPress={() => {
                addData();
                onChangeText('');
              }}
              title="Add Data"></Button>
            <Button onPress={onStopWatchFinish} title="Add To time Data"></Button>
          </SafeAreaView>


Whats currently happening....
limit of 5 things !
  const addData = async () => {
    let userId = 'Z20rA8EtLKfZ7PadJ7FcQjrfyFH3';
    try {
      const docData = {
        activity: 'Cardio',
        id: Date.now(),
      };
      const postData = await updateDoc(
        doc(db, userId, 'testActivities'),

        { activities: arrayUnion(docData) }
      );
      console.log(postData, 'heres the data... ');
      return docData;
    } catch (error) {
      console.log('Error adding activity', error);
    }
  };

 const addTimeDataOnFinish = async () => {
    let activityName = selectedName;
    let totalTime = 1000; // getting time from clockit screen.
    // [{ activityName, timeToday: totalTime }],

    try {
      let updatedActivity = await updateTimeOnFinish(totalTime, activityName);
      let dayOfWeek = findDay().getDate();
      let id = updatedActivity.id.toString();
      let name = updatedActivity.name;
      console.log(id);
      let post = await setDoc(
        doc(db, userId, 'Week Data'),

        { [dayOfWeek]: { [name]: updatedActivity } },
        { merge: true }
      );
    } catch (error) {
      console.log('ERROR', error);
    }
  };


  const updateTimeOnFinish = async (totalTime, activityName) => {
    try {
      let userId = 'b29cCTmC4KVmpZJozxQgoNCgbhr2';
      // actually updates the activitiy...

      let filteredActivity;
      let newActivities = userActivities.map((act) => {
        if (act.name === activityName) {
          act.totalTime += totalTime;
          filteredActivity = act;
        }
        return act;
      });

      // sets the document in the DB with updated activity time.
      let currentTime = await setDoc(doc(db, userId, 'activities'), {
        activities: newActivities,
      });
      // updates the state.
      setUserActivities(newActivities);
      return filteredActivity;
    } catch (error) {
      console.log('ERROR UPDATEDINGTIMEONFINISH', error);
    }
  };


*/

// ARRAY LIMITATIONS

/*
 we'll end up having to read a couple times  because we cant get the correct index of the item to update.

 so we'd have to read , get the array value we want and replace it.









const addData = async () => {
    const activity = text;
    if (userActivities.length === 5 || text.trim() === '') {
      console.log('notAdding');
      return;
    }
    let existsInUserActivities = userActivities.some((value) => value.name === text.trim());

    if (existsInUserActivities) {
      console.log('not adding');
      return;
    }
    try {
      const docData = createActivityData(activity);
      const postData = await updateDoc(
        doc(db, userId, 'activities'),

        { activities: arrayUnion(docData) }
      );
      console.log(postData, 'heres the data... ');

      let newRef = userActivitiesRef.current;
      newRef.push(docData);
      userActivitiesRef.current = newRef;
      setUserActivities((prevActivities) => [docData, ...prevActivities]);
    } catch (error) {
      console.log('Error adding activity', error);
    }
  };




*/
