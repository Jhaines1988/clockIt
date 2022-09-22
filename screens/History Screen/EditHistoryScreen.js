import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserHistoryAsync } from '../../app/userHistory';
import HistoryCard from '../../components/History Cards/HistoryCard';
import GradientView from '../../components/UI/BackgroundContainer';
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
