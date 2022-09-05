import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../store/Auth-Context';

const SettingsCog = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={require('../../assets/settingscog.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'flex-start', marginHorizontal: 16, marginBottom: 28 },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  image: { width: 50, height: 50 },
});
export default SettingsCog;
