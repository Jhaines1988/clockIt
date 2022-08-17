import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
function SignUpLogInButton({ children, onPress }) {
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

export default SignUpLogInButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 60,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: ClockItColors.buttonLime,
    elevation: 2,
    marginLeft: 10,
    borderWidth: 2,
    width: 325,
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Manrope_600SemiBold',
    color: ClockItColors.dkBlue,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
