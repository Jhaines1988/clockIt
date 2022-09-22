import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import GradientView from '../UI/BackgroundContainer';
import ReusableUIButton from '../buttons/ReusableUIButton';
import { convertCentisecondsToEditHistoryScreenFormat } from '../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { dayMap, monthMap } from '../../utils/DateTimeHelpers/DateTimeMaps';
import { ClockItColors } from '../../constants/styles';
import RenderItemEditHistoryCard from './RenderItemEditHistoryCard';
const EditHistoryCard = ({ modalVisible, onPress, week, dateString }) => {
  console.log('WEEK------', week);
  const { height, width } = useWindowDimensions();
  return (
    <Modal visible={modalVisible} presentationStyle="overFullScreen" animationType="slide">
      <GradientView>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            // backgroundColor: 'black',
          }}>
          <View style={styles.dateHeading}>
            <Text style={styles.date}>{dateString}</Text>
          </View>
          <View
            style={[
              styles.flatListContainer,
              { width: (width / 1.13) | 0, maxHeight: (height / 1.9) | 0 },
            ]}>
            <FlatList
              bounces={false}
              contentContainerStyle={styles.flatList}
              data={week}
              renderItem={({ item, index }) => {
                return <RenderItemEditHistoryCard item={item} index={index} />;
              }}
              keyExtractor={(item) => item.date}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ReusableUIButton
              onPress={onPress}
              buttonStyle={styles.buttonStyle}
              buttonTextContainerStyle={styles.buttonTextContainerStyle}
              buttonTextStyle={styles.buttonTextStyle}>
              Close
            </ReusableUIButton>
          </View>
        </SafeAreaView>
      </GradientView>
    </Modal>
  );
};

export default EditHistoryCard;

const styles = StyleSheet.create({
  container: {},
  flatListContainer: {
    flex: 0.75,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    shadowColor: '#D6EFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    justifyContent: 'center',
    margin: 24,
    marginTop: 0,
  },
  dateHeading: { marginBottom: 8, marginHorizontal: 24 },
  date: {
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
  flatList: {
    margin: 24,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 0.6,
    backgroundColor: ClockItColors.buttonLime,
    marginHorizontal: 50,
    borderRadius: 60,
    justifyContent: 'center',
  },
  buttonTextContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 28,
    lineHeight: 38,
    color: ClockItColors.darkestBlue,
    textAlign: 'center',
  },
});
