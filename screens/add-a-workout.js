import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../contexts/user-context';

const AddAWorkoutScreen = (props) => {
  const [type, setType] = useState('Back');
  const [image, setImage] = useState('https://i.imgur.com/QKit3gt.jpg');
  const { user } = useContext(UserContext);

  const date = new Date().toISOString().split('T')[0];
  const images = {
    Back: 'https://i.imgur.com/QKit3gt.jpg',
    Chest: 'https://i.imgur.com/Irz3q6x.jpg',
    Quads: 'https://i.imgur.com/5mndGWy.jpg',
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
        createdBy: user.user.email,
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
          <Picker.Item label="Quads workout" value="Quads" />
          <Picker.Item label="Hamstrings workout" value="Hamstrings" />
        </Picker>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Date:</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Button icon="add-circle-outline" onPress={handlePress} text="Add" />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 280,
    marginTop: 10,
    backgroundColor: '#797979',
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
  date: {
    textAlign: 'center',
    color: '#20639b',
    fontSize: 30,
  },
  innerContainer: {
    marginVertical: 50,
  },
});

export default AddAWorkoutScreen;
