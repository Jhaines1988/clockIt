import React from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
import ReusableUIButton from '../buttons/ReusableUIButton';
import GradientView from '../UI/BackgroundContainer';
import DateTimeDisplay from './DateTimeDisplay';
import RenderItemEditHistoryCard from './RenderItemEditHistoryCard';
import TotalTimeDisplay from './TotalTimeDisplay';

const EditHistoryCard = ({ modalVisible, onPress, week, dateString, totalTime }) => {
  const { height, width } = useWindowDimensions();

  return (
    <Modal visible={modalVisible} presentationStyle="overFullScreen" animationType="slide">
      <GradientView>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <DateTimeDisplay dateString={dateString} />
          <View style={[styles.flatListContainer, { width: width / 1.13 }]}>
            <TotalTimeDisplay
              totalTime={totalTime}
              onEditButtonPressHandler={null}
              includeIcon={false}
            />
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
              buttonStyle={[styles.buttonStyle, { marginHorizontal: width / 6 }]}
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

  flatList: {
    marginHorizontal: 24,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 0.75,
    backgroundColor: ClockItColors.buttonLime,

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
