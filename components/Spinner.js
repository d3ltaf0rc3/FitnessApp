import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = () => {
  return (
    <View title="Home">
      <ActivityIndicator style={styles.spinner} size={82} color="#20639b" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginTop: 65,
  },
});

export default Spinner;
