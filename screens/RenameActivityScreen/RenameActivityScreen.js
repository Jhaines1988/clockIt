import React, { useContext, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ReusableUIButton from '../../components/buttons/ReusableUIButton';
import GradientView from '../../components/UI/BackgroundContainer';
import FinishedClocking from '../../components/UI/FinishedClocking';
import { ClockItColors } from '../../constants/styles';
import { renameActivityInHistory, updateUserActivities } from '../../db/writeClockitData';
import { UserContext } from '../../store/User-Context';
function RenameActivityScreen({ navigation, route }) {
  const userCtx = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const { userId } = route.params;
  let originalName = useRef(userCtx.currentActivityItem.name);
  const renameActivityHandler = async () => {
    if (!text.trim().length) {
      return;
    }
    try {
      userCtx.currentActivityItem.name = text;
      await updateUserActivities(userId, userCtx.activities);
      await renameActivityInHistory(userId, userCtx.currentActivityItem.id, text);
      userCtx.dispatch({ type: 'RENAME', payload: userCtx.currentActivityItem });
      handleModalOpenClose();
    } catch (error) {
      console.log('error Renaming your activity', error);
    }
  };

  const handleModalOpenClose = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <GradientView>
      <KeyboardAvoidingView behavior="padding" style={styles.keyBoardAvoidingView}>
        <FinishedClocking
          modalVisible={modalVisible}
          onPress={handleModalOpenClose}
          displayText={`Renamed ${originalName.current} to ${text}`}
          screenToNavigateTo={{ name: 'Clockit', params: { userId } }}
        />
        <View style={styles.originalNameContainer}>
          <Text style={styles.heading}> Rename</Text>
          <Text style={styles.originalName}>{originalName.current}</Text>
        </View>
        <SafeAreaView style={styles.safeAreaWrapper}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder=""
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
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
      </KeyboardAvoidingView>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {},
  keyBoardAvoidingView: {
    flex: 1,
  },
  originalNameContainer: { flex: 0.5, justifyContent: 'flex-end', marginBottom: 60 },
  heading: { fontFamily: 'Manrope_400Regular', color: 'white', fontSize: 32, textAlign: 'center' },
  originalName: {
    fontFamily: 'Manrope_700Bold',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  safeAreaWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 0.1,
    alignItems: 'flex-start',
    marginBottom: 40,
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
    flex: 0.7,
    borderRadius: 60,
    height: 64,
    maxHeight: 70,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonTextContainer: { flex: 1, justifyContent: 'center', height: 64 },
  buttonText: {
    textAlign: 'center',
    color: ClockItColors.dkBlue,
    fontSize: 26,
    fontFamily: 'Manrope_500Medium',
  },
});

export default RenameActivityScreen;
