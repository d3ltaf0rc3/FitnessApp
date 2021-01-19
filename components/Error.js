import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ff6666',
    borderColor: '#ec3838',
    borderWidth: 3,
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default ErrorComponent;
