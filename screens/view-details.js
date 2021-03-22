import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../components/Wrapper';
import Exercise from '../components/Exercise';
import DetailsHeader from '../components/DetailsHeader';
import WorkoutContext from '../contexts/workout-context';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const ViewDetailsScreen = (props) => {
  const [exercise, setExercise] = useState('');
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('workouts')
      .doc(props.route.params.key)
      .onSnapshot((entry) => {
        if (entry?.data()) {
          setWorkout({ ...entry.data(), key: props.route.params.key });
        }
      });

    return () => subscriber();
  }, [props.route.params.key]);

  const deleteWorkout = () => {
    firestore()
      .collection('workouts')
      .doc(workout.key)
      .delete()
      .then(() => props.navigation.goBack());
  };

  const addExercise = () => {
    firestore()
      .collection('workouts')
      .doc(workout.key)
      .update({
        exercises: firestore.FieldValue.arrayUnion({
          id: workout.exercises.length,
          name: exercise,
          sets: [],
        }),
      })
      .then(() => setExercise(''));
  };

  if (!workout) {
    return (
      <Wrapper title="View Details">
        <Spinner />
      </Wrapper>
    );
  }

  return (
    <WorkoutContext.Provider value={workout}>
      <ScrollView style={styles.container}>
        <Wrapper title="View Details">
          <View style={styles.innerContainer}>
            <DetailsHeader />
            <View>
              <Text style={styles.heading}>Add an exercise</Text>
              <View style={styles.addContainer}>
                <TextInput
                  onChangeText={(value) => setExercise(value)}
                  value={exercise}
                  placeholder="Exercise..."
                  style={styles.input}
                />
                <Icon
                  onPress={addExercise}
                  name="arrow-forward-outline"
                  color="#b9bbb6"
                  size={32}
                />
              </View>
            </View>
            <View>
              <Text style={styles.heading}>
                {workout.exercises.length === 0
                  ? 'No exercises to show'
                  : 'Exercises'}
              </Text>
              {workout.exercises.map((entry, index) => (
                <Exercise item={entry} key={index} />
              ))}
            </View>
            <View style={styles.btnContainer}>
              <Button
                icon="trash-outline"
                text="Delete"
                onPress={deleteWorkout}
                background="#ed4956"
              />
            </View>
          </View>
        </Wrapper>
      </ScrollView>
    </WorkoutContext.Provider>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 26,
  },
  input: {
    backgroundColor: '#808588',
    width: 330,
    borderRadius: 10,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  btnContainer: {
    alignSelf: 'stretch',
    marginVertical: 30,
  },
});

export default ViewDetailsScreen;
