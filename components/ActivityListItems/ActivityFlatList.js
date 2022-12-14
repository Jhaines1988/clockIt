import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ActivityListItem from './ActivityListItems';

const ActivityFlatList = ({ data, keyExtractor, extraData, onItemPress, onLongItemPress }) => {
  const renderItem = ({ item }) => {
    return (
      <ActivityListItem
        item={item}
        onLongPress={() => {
          onLongItemPress(item);
        }}
        onPress={() => {
          onItemPress(item);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={extraData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: { flex: 1, justifyContent: 'flex-start' },
});

export default ActivityFlatList;
