import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import GradientView from '../../components/UI/BackgroundContainer';
import { ClockItColors } from '../../constants/styles';
import { db } from '../../firebase';
import useFetchHistory from '../../hooks/useFetchHistory';
import { AuthContext } from '../../store/Auth-Context';
import { HistoryContext } from '../../store/History-Context';
import { convertCentiSecondsToHMS } from '../../utils/convertCentisecondstoHMS';
import { convertCentisecondsToHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { monthMap, dayMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
import { Feather } from '@expo/vector-icons';
import IconButton from '../../components/buttons/IconButton';
const window = Dimensions.get('window');

const HistoryScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const { name, id } = route.params;
  const historyCtx = useContext(HistoryContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, lastVisible] = useFetchHistory(authCtx.userId, id);

  function onEditButtonPressHandler(item) {
    historyCtx.dispatch({ type: 'EDIT_ITEM', payload: { id } });
    navigation.navigate('EditHistoryScreen');
  }
  async function fetchMoreData() {
    if (historyCtx.history[id].fullyLoaded) {
      return;
    }
    try {
      const next = query(
        collection(db, authCtx.userId, 'History', id.toString()),
        orderBy('startedAt', 'desc'),
        startAfter(lastVisible.current),
        limit(25)
      );

      let extraData = await getDocs(next);
      lastVisible.current = extraData.docs[extraData.docs.length - 1];
      if (lastVisible.current === undefined) {
        historyCtx.dispatch({ type: 'ALL_DATA_LOADED', payload: { id } });
        return;
      }
      const loadedResults = [];
      extraData.forEach((doc) => {
        loadedResults.push(doc.data());
      });
      historyCtx.dispatch({ type: 'LOAD_MORE_DATA', payload: { loadedResults, id } });
    } catch (error) {
      console.log('ERROR', error);
    }
  }

  if (isLoading) {
    return (
      <GradientView>
        <LoadingOverlay />
      </GradientView>
    );
  }

  return (
    <GradientView>
      <ItemName name={name} />
      <SafeAreaView style={styles.cardContainer}>
        <FlatList
          indicatorStyle="white"
          initialNumToRender={4}
          onEndReachedThreshold={0.3}
          onEndReached={(info) => fetchMoreData(info)}
          data={historyCtx.history[id].history}
          renderItem={({ item }) => {
            return <HistoryCard onEditButtonPressHandler={onEditButtonPressHandler} item={item} />;
          }}
          keyExtractor={(item) => item.startedAt}
        />
      </SafeAreaView>
    </GradientView>
  );
};

export default HistoryScreen;
const styles = StyleSheet.create({ cardContainer: { flex: 1 } });

const ItemName = ({ name }) => {
  return (
    <View style={itemNameStyles.titleContainer}>
      <Text style={itemNameStyles.title}>History</Text>
    </View>
  );
};

const itemNameStyles = StyleSheet.create({
  titleContainer: { flex: 0.1, marginBottom: 30 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 40, color: 'white', lineHeight: 55 },
});

export const CurrentWeekCard = ({ item, onEditButtonPressHandler }) => {
  const weekSoFar = Object.keys(item).reduce((acc, key) => {
    if (key !== 'id' && key !== 'name' && key !== 'totalTime') {
      acc.push({ date: key, time: item[key] });
    }
    return acc;
  }, []);

  return (
    <>
      <View style={cardStyles.cardContainer}>
        <View style={cardStyles.totalContainer}>
          <Text style={cardStyles.totalText}>Total </Text>
          <View style={cardStyles.totalAndEditIconContainer}>
            <Text style={[cardStyles.totalText, { fontSize: 18 }]}>
              {convertCentisecondsToHistoryScreenFormat(item.totalTime)}
            </Text>
            {/* <Feather name="edit" size={24} color="blue" /> */}
            <IconButton
              style={{
                margin: 0,
                borderRadius: 0,
              }}
              icon="md-pencil-sharp"
              color="blue"
              size={24}
              onPress={() => {
                onEditButtonPressHandler(item);
              }}
            />
          </View>
        </View>
        <WeeklyDataFlatList week={weekSoFar} />
      </View>
    </>
  );
};
export const HistoryCard = ({ item, onEditButtonPressHandler }) => {
  const weekStart = item.startedAt.toDate();
  const weekEnd = item.endedAt.toDate();
  return (
    <>
      <View style={cardStyles.dateHeading}>
        <Text style={cardStyles.date}>
          {monthMap[weekStart.getMonth()]} {weekStart.getDate()}, {weekStart.getFullYear()}
        </Text>
      </View>
      <View style={cardStyles.cardContainer}>
        <View style={cardStyles.totalContainer}>
          <Text style={cardStyles.totalText}>Total </Text>
          <View style={cardStyles.totalAndEditIconContainer}>
            <Text style={[cardStyles.totalText, { fontSize: 18 }]}>
              {convertCentisecondsToHistoryScreenFormat(item.totalTime)}
            </Text>
            {/* <Feather name="edit" size={24} color="blue" /> */}
            <IconButton
              style={{
                margin: 0,
                borderRadius: 0,
              }}
              icon="md-pencil-sharp"
              color="blue"
              size={24}
              onPress={() => {
                onEditButtonPressHandler(item);
              }}
            />
          </View>
        </View>
        <WeeklyDataFlatList week={item.week} />
      </View>
    </>
  );
};

const cardStyles = StyleSheet.create({
  dateHeading: { marginBottom: 8, marginHorizontal: 24 },
  cardContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 50,
    width: (window.width / 1.13) | 0,
    // maxHeight: (window.width / 5) | 0,
    borderRadius: 8,
  },
  totalContainer: {
    flex: 0.3,
    borderBottomColor: '#D6EFFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    marginHorizontal: 16,
    color: ClockItColors.darkestBlue,
  },
  totalAndEditIconContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  date: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
  },
});
// const cardStyles = StyleSheet.create({
//   dateHeading: { marginBottom: 8, marginHorizontal: 24 },
//   cardContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginHorizontal: 24,
//     marginBottom: 50,
//     width: (window.width / 1.13) | 0,
//     height: (window.width / 1.13 - 45) | 0,
//     borderRadius: 8,
//   },
//   totalContainer: {
//     flex: 0.3,
//     borderBottomColor: '#D6EFFF',
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalText: {
//     fontFamily: 'Manrope_700Bold',
//     fontSize: 24,
//     marginHorizontal: 16,
//     color: ClockItColors.darkestBlue,
//   },
//   totalAndEditIconContainer: {
//     flexDirection: 'row',
//     marginRight: 8,
//   },
//   date: {
//     color: 'white',
//     fontFamily: 'Manrope_400Regular',
//     fontSize: 16,
//   },
// });

const WeeklyDataFlatList = ({ week }) => {
  console.log('week', week);
  return (
    <SafeAreaView style={weeklyDataFlatListStyles.flatListContainer}>
      <FlatList
        style={weeklyDataFlatListStyles.list}
        data={week}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          return <WeeklyDataFlatListItem time={item.time} date={item.date} />;
        }}
      />
    </SafeAreaView>
  );
};

const weeklyDataFlatListStyles = StyleSheet.create({
  flatListContainer: { flex: 1, marginTop: 18, marginBottom: 24, marginHorizontal: 16 },
  list: {},
});

const WeeklyDataFlatListItem = ({ time, date }) => {
  return (
    <View style={weeklyDataFlatListItemStyles.dateTimeWrapper}>
      <Text style={weeklyDataFlatListItemStyles.date}>{dayMap[date.slice(0, 3)]}</Text>
      <Text style={weeklyDataFlatListItemStyles.time}>
        {convertCentisecondsToHistoryScreenFormat(time)}
      </Text>
    </View>
  );
};

const weeklyDataFlatListItemStyles = StyleSheet.create({
  dateTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  date: {
    fontFamily: 'Manrope_400Regular',

    fontSize: 16,
    color: ClockItColors.darkestBlue,
  },
  time: {
    fontFamily: 'Manrope_400Regular',

    fontSize: 16,
    color: ClockItColors.darkestBlue,
  },
});
