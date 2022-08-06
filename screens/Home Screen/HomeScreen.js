import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';
import ActivityFlatList from '../../components/ActivityListItems/ActivityFlatList';
import { getUserDataOnMount } from '../../db/readClockitData';
import { deleteItemFromActivitiesList } from '../../db/deleteClockitData';
import { getTimeActivityData } from '../../db/readClockitData';
import { updateActivityTimeOnFinish, updateUserActivities } from '../../db/writeClockitData';
import { db } from '../../firebase';
import {
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDocs,
  collection,
  Timestamp,
  getDoc,
  arrayUnion,
  orderBy,
} from 'firebase/firestore';
function createActivityData(activityName) {
  const activity = {
    name: activityName,
    id: Date.now(),
    totalTime: 0,
  };
  return activity;
}
import { findDay, findTheNextSunday } from '../../utils/DateTimeHelpers/getDay';
import { convertCentiSecondsToHMS } from '../../utils/convertCentisecondstoHMS';
import AuthContextProvider, { AuthContext } from '../../store/Auth-Context';
import { getUserActivities } from '../../db/readClockitData';
const instantiateUser = async () => {
  let id = 'b29cCTmC4KVmpZJozxQgoNCgbhr2';
  /// need to call date helper funciton to determine when the next sunday is.
  let docData = {
    activities: [],
  };

  let today = findDay();
  let nextSunday = findTheNextSunday(today);
  let weekData = {
    expiresAt: Timestamp.fromDate(nextSunday),
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  };

  try {
    await setDoc(doc(db, id, 'activities'), docData);
    await setDoc(doc(db, id, 'Week Data'), weekData);
  } catch (error) {
    console.log(error, '<====');
  }
};
/* FUNCTION THAT WILL BE CALLED ON SIGNUP >  */
const instantiateNewUser = async () => {
  let id = 'b29cCTmC4KVmpZJozxQgoNCgbhr2';
  /// need to call date helper funciton to determine when the next sunday is.
  let docData = {
    activities: [],
  };
  let today = findDay();
  let nextSunday = findTheNextSunday(today);
  let weekData = {
    expiresAt: Timestamp.fromDate(nextSunday),
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  };
  let lastSunday = new Date(nextSunday);
  lastSunday.setDate(lastSunday.getDate() - 7);
  let firstWeekLabel = lastSunday.toISOString();
  try {
    await setDoc(doc(db, id, 'activities'), docData);
    await setDoc(doc(db, id, 'Week Data'), weekData);
    await setDoc(doc(db, id, 'Previous Weeks', 'history', firstWeekLabel), {});
  } catch (error) {
    console.log(error, '<====');
  }
};
const Item = ({ item, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {item.name} : {convertCentiSecondsToHMS(item.totalTime)}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const [userActivities, setUserActivities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const userActivitiesRef = useRef([]);
  const [text, onChangeText] = React.useState('');
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  useEffect(() => {
    getUserData();
    return () => {
      console.log('userActivites', userActivities);
    };
  }, []);

  /* GET USER DATA ON LOAD============================== */
  const getUserData = async function () {
    try {
      const userActivitesOnLoad = await getUserActivities(userId);
      setUserActivities(userActivitesOnLoad.activities);
      userActivitiesRef.current = userActivitesOnLoad.activities;
      console.log('selectedActivitgy', selectedItem);
    } catch (error) {
      console.log('Error getting user data:', error);
    }
  };

  /* ADD TIME DATA ON FINISH AND UPDATE TIME DATA>>>>>>> */

  const onStopWatchFinish = async () => {
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

  /* Addingding a newActivity to Firebase  */
  const addData = async () => {
    let userId = 'b29cCTmC4KVmpZJozxQgoNCgbhr2';
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

      // let newRef = userActivitiesRef.current;
      // newRef.push(docData);
      // userActivitiesRef.current = newRef;
      setUserActivities((prevActivities) => [docData, ...prevActivities]);
    } catch (error) {
      console.log('Error adding activity', error);
    }
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

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView>
        <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
      </SafeAreaView>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

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
*/
