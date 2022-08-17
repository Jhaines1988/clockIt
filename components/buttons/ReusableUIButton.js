import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ClockItColors } from '../../constants/styles';
function ReusableUIButton({ children, onPress, style, backgroundColor }) {
  return (
    <Pressable
      style={({ pressed }) => [
        style.button,
        { backgroundColor: backgroundColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <View style={style.buttonTextContainer}>
        <Text style={style.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default ReusableUIButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
