import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoadingOverlay from '../../components/auth/ui/LoadingOverlay';
import GradientView from '../../components/UI/BackgroundContainer';
import { db } from '../../firebase';
import useFetchHistory from '../../hooks/useFetchHistory';
import { AuthContext } from '../../store/Auth-Context';
import { HistoryContext } from '../../store/History-Context';
import { convertCentiSecondsToHMS } from '../../utils/convertCentisecondstoHMS';
const window = Dimensions.get('window');

const HistoryScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const { name, id } = route.params;
  const historyCtx = useContext(HistoryContext);
  const [isLoading, lastVisible] = useFetchHistory(authCtx.userId, id);

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
          initialNumToRender={4}
          onEndReachedThreshold={0.4}
          onEndReached={(info) => fetchMoreData(info)}
          data={historyCtx.history[id].history}
          renderItem={({ item }) => {
            return <HistoryCard item={item} />;
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
      <Text style={itemNameStyles.title}>{name}</Text>
    </View>
  );
};

const itemNameStyles = StyleSheet.create({
  titleContainer: { flex: 0.1 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 44 },
});

const HistoryCard = ({ item }) => {
  // console.log(item, 'hereher');

  return (
    <View style={cardStyles.cardContainer}>
      <Text style={cardStyles.date}>
        Week of {item.startedAt.toDate().toLocaleDateString()} -{' '}
        {item.endedAt.toDate().toLocaleDateString()}
      </Text>
      <View>
        <Text>Total Time {convertCentiSecondsToHMS(item.totalTime)}</Text>
      </View>
      <WeeklyDataFlatList week={item.week} />
    </View>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 22,
    marginBottom: 22,
    width: window.width / 1.1,
    height: window.height / 3,
    borderRadius: 8,
  },
  date: {
    fontFamily: 'Manrope_700Bold',
    // flex: 2,
  },
});

const WeeklyDataFlatList = ({ week }) => {
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
  flatListContainer: { flex: 1 },
  list: { paddingHorizontal: 4, paddingTop: 2 },
});

const WeeklyDataFlatListItem = ({ time, date }) => {
  return (
    <View style={weeklyDataFlatListItemStyles.dateTimeWrapper}>
      <Text style={weeklyDataFlatListItemStyles.date}>{date.slice(0, -4)}:</Text>
      <Text style={weeklyDataFlatListItemStyles.time}>
        {convertCentiSecondsToHMS(time).slice(0, -4)}
      </Text>
    </View>
  );
};

const weeklyDataFlatListItemStyles = StyleSheet.create({
  dateTimeWrapper: {
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'flex-start',
  },
  date: { fontFamily: 'Manrope_600SemiBold', marginRight: 4, fontSize: 16 },
  time: { fontFamily: 'Manrope_600SemiBold', fontSize: 16 },
});
