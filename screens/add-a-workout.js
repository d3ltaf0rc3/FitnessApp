import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Wrapper from '../components/Wrapper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const AddAWorkoutScreen = (props) => {
  const [type, setType] = useState('Back');
  const [image, setImage] = useState('https://i.imgur.com/QKit3gt.jpg');
  const date = new Date().toISOString().split('T')[0];
  const images = {
    Back: 'https://i.imgur.com/QKit3gt.jpg',
    Chest: 'https://i.imgur.com/Irz3q6x.jpg',
    Glutes: 'https://i.imgur.com/5mndGWy.jpg',
    Hamstrings: 'https://i.imgur.com/k0vCrPh.jpg',
  };

  const handlePress = () => {
    firestore()
      .collection('workouts')
      .add({
        type,
        createdAt: firestore.FieldValue.serverTimestamp(),
        exercises: [],
        image,
      })
      .then(() => {
        props.navigation.navigate('All workouts');
      });
  };

  return (
    <Wrapper title="Add a workout">
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Choose a workout type:</Text>
        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setType(itemValue);
            setImage(images[itemValue]);
          }}>
          <Picker.Item label="Back workout" value="Back" />
          <Picker.Item label="Chest workout" value="Chest" />
          <Picker.Item label="Glutes workout" value="Glutes" />
          <Picker.Item label="Hamstrings workout" value="Hamstrings" />
        </Picker>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Date:</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Icon name="add-circle-outline" color="#fff" size={32} />
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 40,
    width: 250,
    marginVertical: 10,
    backgroundColor: '#797979',
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  date: {
    color: '#20639b',
    fontSize: 30,
  },
  innerContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    marginTop: 50,
    backgroundColor: '#20639b',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default AddAWorkoutScreen;
