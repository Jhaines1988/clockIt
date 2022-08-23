import React, { useState, useContext } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import GradientView from '../../components/UI/BackgroundContainer';
import ReusableUIButton from '../../components/buttons/ReusableUIButton';
import { updateUserActivities } from '../../db/writeClockitData';
import { UserContext } from '../../store/User-Context';
import { ClockItColors } from '../../constants/styles';
function RenameActivityScreen({ navigation, route }) {
  const userCtx = useContext(UserContext);
  const [text, onChangeText] = useState('');
  const { userId } = route.params;
  const renameActivityHandler = async () => {
    if (!text.trim().length) {
      return;
    }
    try {
      userCtx.currentActivityItem.name = text;
      userCtx.dispatch({ type: 'UPDATE', payload: userCtx.currentActivityItem });
      await updateUserActivities(userId, userCtx.activities);
    } catch (error) {
      console.log('error Renaming your activity', error);
    }
  };

  return (
    <GradientView>
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.textInputContainer}>
          <TextInput placeholder="" style={styles.input} onChangeText={onChangeText} value={text} />
        </View>
        <View style={styles.buttonContainer}>
          <ReusableUIButton
            onPress={renameActivityHandler}
            buttonStyle={styles.button}
            buttonTextContainerStyle={styles.buttonTextContainer}
            buttonTextStyle={styles.buttonText}>
            Rename
          </ReusableUIButton>
        </View>
      </SafeAreaView>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {},
  safeAreaWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 0.1,
    alignItems: 'flex-start',
  },
  input: {
    color: 'black',
    flex: 0.8,
    minHeight: 50,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  buttonContainer: { flexDirection: 'row', flex: 0.2 },
  button: {
    backgroundColor: ClockItColors.buttonLime,
    flex: 0.6,
    borderRadius: 60,
    height: 50,
    maxHeight: 60,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buttonTextContainer: {},
});

export default RenameActivityScreen;
