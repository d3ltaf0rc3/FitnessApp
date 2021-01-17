import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = (props) => {
  return (
    <Pressable style={styles.btn} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: '#20639b',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Button;
