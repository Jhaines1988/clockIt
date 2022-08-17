import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
function SaveActivityButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default SaveActivityButton;

const styles = StyleSheet.create({
  button: {
    flex: 0.4,
    borderRadius: 60,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: ClockItColors.buttonLime,
    elevation: 2,
    marginLeft: 10,
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: ClockItColors.dkBlue,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
