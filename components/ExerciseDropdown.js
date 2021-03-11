import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import SetComponent from './Set';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import WorkoutContext from '../contexts/workout-context';

const ExerciseDropdown = (props) => {
  const { key, exercises } = useContext(WorkoutContext);
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  const handlePress = () => {
    const updatedExercises = exercises.slice();
    updatedExercises[props.item.id].sets.push(
      `${reps} reps with ${weight} lbs`,
    );

    firestore()
      .collection('workouts')
      .doc(key)
      .update({
        exercises: updatedExercises,
      })
      .then(() => {
        setWeight('');
        setReps('');
      });
  };

  return (
    <View style={styles.container}>
      {props.item.sets.length !== 0 ?
        props.item.sets.map((text, index) => <SetComponent text={text} key={index} />) :
        <Text style={styles.text}>No sets available</Text>}
      <View style={styles.newSetContainer}>
        <TextInput
          value={reps}
          onChangeText={(text) => setReps(text)}
          placeholderTextColor="#101010"
          placeholder="Reps..."
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={(text) => setWeight(text)}
          placeholderTextColor="#101010"
          placeholder="Weight..."
          style={styles.input}
          keyboardType="numeric"
        />
        <Icon onPress={handlePress} name="add-outline" color="#fff" size={32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#48494b',
    borderWidth: 1,
    borderColor: '#3e424b',
    borderTopWidth: 0,
  },
  input: {
    backgroundColor: '#363636',
    width: 80,
    height: 30,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
  },
  newSetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ExerciseDropdown;
