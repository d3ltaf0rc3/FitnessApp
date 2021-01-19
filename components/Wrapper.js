import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

const Wrapper = (props) => {
  return (
    <View style={styles.container}>
      <Header title={props.title} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    display: 'flex',
    alignItems: 'center',
  },
});

export default Wrapper;
