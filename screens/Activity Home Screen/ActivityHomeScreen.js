import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CurrentWeekCard from '../../components/History Cards/CurrentWeekCard';
import GradientView from '../../components/UI/BackgroundContainer';
const ActivityHomeScreen = ({ navigation }) => {
  const activityData = useSelector((state) => state.userHomeScreen.currentActivityItem);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: activityData.name,
    });
  }, [navigation]);
  return (
    <GradientView style={{ justifyContent: 'flexStart' }}>
      <CurrentWeekCard item={activityData} />
    </GradientView>
  );
};

export default ActivityHomeScreen;

const styles = StyleSheet.create({});
