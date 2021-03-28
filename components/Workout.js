import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Button from './Button';
import Spinner from './Spinner';

const Workout = (props) => {
  const navigation = useNavigation();

  if (!props.workout.createdAt) {
    return <Spinner />;
  }

  const handlePress = () => {
    navigation.navigate('View details', {
      workout: props.workout,
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.workout.image }} />
      <Text style={styles.text}>{props.workout.type} workout</Text>
      <Text style={styles.text}>Date: {props.workout.createdAt}</Text>
      <View style={styles.btnContainer}>
        <Button onPress={handlePress} text="View Details" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 3,
    borderColor: '#20639b',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    height: 150,
    width: 150,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 30,
    alignSelf: 'stretch',
  },
});

export default Workout;
