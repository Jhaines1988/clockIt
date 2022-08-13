import { View, Text, FlatList, StyleSheet } from 'react-native';
import ActivityListItem from './ActivityListItems';

const ActivityFlatList = ({ data, keyExtractor, extraData, onItemPress }) => {
  const renderItem = ({ item }) => {
    return (
      <ActivityListItem
        item={item}
        onPress={() => {
          onItemPress(item);
        }}
      />
    );
  };
  return (
    <View style={styles.flatContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={extraData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatContainer: {
    marginTop: 30,
    marginBottom: 40,
    justifyContent: 'center',
  },
});

export default ActivityFlatList;
