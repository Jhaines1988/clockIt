import React, { useState } from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ClockItColors } from '../../constants/styles';
import { createHours, createMinutes } from '../../utils/Manual-Input-Helpers/createMinutes';
import GradientView from '../UI/BackgroundContainer';

const minutes = createMinutes();
const hours = createHours();

const ManualTimeInput = ({ modalVisible }) => {
  const [userTimeInput, setUserTimeInput] = useState({ hours: 0, minutes: 0 });
  const { width, height } = useWindowDimensions();
  const itemHeight = (height / 12) | 0;

  return (
    <Modal visible={modalVisible} presentationStyle="overFullScreen" animationType="fade">
      <GradientView>
        <View style={[styles.hoursMinutesLabelContainer, { height: itemHeight }]}>
          <Text style={[styles.hoursMinutesLabelText, { width: itemHeight * 2.5 }]}>Hours</Text>
          <Text style={[styles.hoursMinutesLabelText, { width: itemHeight * 2.5 }]}>Minutes</Text>
        </View>
        <SafeAreaView style={styles.manualTimeInputContainer}>
          <View
            style={[
              styles.hoursAndMinutesContainer,
              {
                height: itemHeight,
              },
            ]}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={({ nativeEvent }) => {
                setUserTimeInput((prevState) => {
                  return { ...prevState, hours: nativeEvent.contentOffset.y / itemHeight };
                });
              }}
              snapToOffsets={hours.map((hours, i) => i * itemHeight)}
              decelerationRate="fast">
              {hours.map((hour, index) => (
                <Item title={hour} itemHeight={itemHeight} key={Math.random().toString()} />
              ))}
            </ScrollView>
          </View>
          <View
            style={[
              styles.hoursAndMinutesContainer,
              {
                height: itemHeight,
              },
            ]}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={({ nativeEvent }) => {
                setUserTimeInput((prevState) => {
                  return { ...prevState, minutes: nativeEvent.contentOffset.y / itemHeight };
                });
              }}
              snapToOffsets={minutes.map((minutes, i) => i * itemHeight)}
              decelerationRate="fast">
              {minutes.map((minute, index) => (
                <Item title={minute} itemHeight={itemHeight} key={Math.random().toString()} />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
        <Button
          title="check"
          onPress={() => {
            console.log(userTimeInput);
          }}
        />
      </GradientView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  manualTimeInputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hoursMinutesLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  hoursMinutesLabelText: {
    flex: 1,
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Manrope_500Medium',
  },
  hoursAndMinutesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManualTimeInput;

const Item = ({ title, itemHeight }) => {
  return (
    <View style={[ItemStyles.ItemContainer, { height: itemHeight }]}>
      <Text style={[ItemStyles.text, { width: itemHeight * 2.5 }]}>{title}</Text>
    </View>
  );
};

const ItemStyles = StyleSheet.create({
  ItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ClockItColors.blue,
  },
  text: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 50,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});
