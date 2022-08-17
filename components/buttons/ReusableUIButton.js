import { Pressable, StyleSheet, Text, View } from 'react-native';

function ReusableUIButton({
  children,
  onPress,
  style = {},
  buttonStyle,
  buttonTextContainerStyle,
  buttonTextStyle,
}) {
  return (
    <Pressable style={({ pressed }) => [buttonStyle, pressed && styles.pressed]} onPress={onPress}>
      <View style={buttonTextContainerStyle}>
        <Text style={buttonTextStyle}>{children}</Text>
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
