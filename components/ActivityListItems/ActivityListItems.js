import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActivityListItem = ({ item, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.activity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default ActivityListItem;
