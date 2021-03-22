import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = (props) => {
  return (
    <Pressable
      style={{ ...styles.btn, backgroundColor: props.background || '#20639b' }}
      onPress={props.onPress}>
      {props.icon ? <Icon name={props.icon} color="#fff" size={32} /> : null}
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 8,
  },
});

export default Button;
