import { View, Text, FlatList, StyleSheet } from 'react-native';
import ActivityListItem from './ActivityListItems';

const ActivityFlatList = ({
  data,
  keyExtractor,
  extraData,
  selectedId,
  setSelectedId,
  setSelectedName,
}) => {
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <ActivityListItem
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedName(item.activity);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
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
    // flex: 0,
    marginTop: 30,
    // marginBottom: 40,
    justifyContent: 'center',
  },
});

export default ActivityFlatList;
