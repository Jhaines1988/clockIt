import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
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
    <SafeAreaView style={styles.flatContainer}>
      <Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }}>Your Activities</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatContainer: {
    flex: 1,
    marginTop: 0,
  },
});

export default ActivityFlatList;
