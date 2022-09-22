import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import CurrentWeekCard from '../../components/History Cards/CurrentWeekCard';
import { useDispatch, useSelector } from 'react-redux';
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
