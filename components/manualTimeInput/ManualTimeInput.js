import {
  Modal,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { createHours, createMinutes } from '../../utils/Manual-Input-Helpers/createMinutes';
import { ClockItColors } from '../../constants/styles';

const minutes = createMinutes();
const hours = createHours();
const ManualTimeInput = ({ modalVisible }) => {
  return (
    <Modal visible={modalVisible} presentationStyle="overFullScreen" animationType="fade">
      <SafeAreaView style={styles.manualTimeInputContainer}>
        <View style={styles.hoursListContainer}>
          <SectionList
            alwaysBounceVertical={false}
            sections={hours}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => {
              return <MinuteItem title={item} />;
            }}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>
        <View style={styles.minutesListContainer}>
          <SectionList
            sections={minutes}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => {
              return <MinuteItem title={item} />;
            }}
            renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  manualTimeInputContainer: {
    flex: 1,
    backgroundColor: ClockItColors.dkBlue,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hoursListContainer: {
    flex: 1,
  },
  header: {},
  hoursList: {
    flex: 1,
    backgroundColor: 'white',
  },
  minutesListContainer: { flex: 1 },
  minutesList: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ManualTimeInput;

const MinuteItem = ({ title }) => {
  return (
    <View style={MinuteItemStyles.minuteItemContainer}>
      <Text style={MinuteItemStyles.minuteText}>{title}</Text>
    </View>
  );
};

const MinuteItemStyles = StyleSheet.create({
  minuteItemContainer: { flex: 1 },
  minuteText: { fontFamily: 'Manrope_400Regular', fontSize: 44 },
});
