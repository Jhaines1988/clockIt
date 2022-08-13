import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { convertCentiSecondsToHMS } from '../../utils/convertCentisecondstoHMS';
const ActivityListItem = ({ item, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text style={[styles.title]}>{item.name}</Text>
      <Text style={[styles.time]}>{convertCentiSecondsToHMS(item.totalTime)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#D6EFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    shadowColor: 'rgb(9, 10, 73)',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width: 375,
  },
  title: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    color: ClockItColors.blue,
    fontFamily: 'Manrope_700Bold',
  },
  time: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'Manrope_400Regular',
    color: ClockItColors.blue,
  },
});
export default ActivityListItem;
