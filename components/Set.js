import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SetComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginVertical: 7,
    marginHorizontal: 5,
    color: '#fff',
    fontSize: 16,
  },
});

export default SetComponent;
