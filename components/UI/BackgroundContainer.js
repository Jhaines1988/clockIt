import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientView = ({ children, style }) => {
  return (
    <LinearGradient
      style={style ? [styles.background, style] : styles.background}
      colors={['#2C2ED0', '#2123AB', '#040573']}
      locations={[0.635, 0.885, 1]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientView;
