import { Pressable, StyleSheet, Text, View } from 'react-native';

function CancelAddActivityButton({ children, onPress }) {
  return (
    <Pressable
      testID="CancelAddActivityButton"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default CancelAddActivityButton;

const styles = StyleSheet.create({
  button: {
    flex: 0.4,
    borderRadius: 60,
    height: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    elevation: 2,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
