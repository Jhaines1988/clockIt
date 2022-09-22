import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import GradientView from '../../components/UI/BackgroundContainer';
import { useSelector, useDispatch } from 'react-redux';
import { initializeNames } from '../../app/userHistory';
import { getUserHistoryAsync } from '../../app/userHistory';
import HistoryCard from '../../components/History Cards/HistoryCard';
const EditHistoryScreen = ({ navigation }) => {
  const history = useSelector((state) => state.userHistory);
  const user = useSelector((state) => state.userHomeScreen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserHistoryAsync(user.userId));
  }, [dispatch]);

  return (
    <GradientView>
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          data={history[user.currentActivityItem.id].history}
          renderItem={({ item }) => {
            return <HistoryCard item={item} />;
          }}
          keyExtractor={(item) => item.startedAt}
        />
      </SafeAreaView>
    </GradientView>
  );
};

export default EditHistoryScreen;

const styles = StyleSheet.create({ safeAreaContainer: { flex: 1 } });
