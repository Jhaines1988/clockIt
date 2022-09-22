import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import WeeklyDataFlatListItem from './WeeklyDatatFlatListItem';

const WeeklyDataFlatList = ({ week }) => {
  return (
    <>
      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          style={styles.list}
          data={week}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => {
            return <WeeklyDataFlatListItem time={item.time} date={item.date} />;
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: { flex: 1, marginTop: 18, marginBottom: 24, marginHorizontal: 16 },
  list: {},
});

export default WeeklyDataFlatList;