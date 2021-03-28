import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../components/Wrapper';
import Exercise from '../components/Exercise';
import WorkoutContext from '../contexts/workout-context';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const ViewDetailsScreen = (props) => {
  const [exercise, setExercise] = useState('');
  const [workout, setWorkout] = useState(props.route.params.workout);

  useEffect(() => {
    const subscriber = firestore()
      .collection('workouts')
      .doc(props.route.params.workout.key)
      .onSnapshot((entry) => {
        if (entry?.data()) {
          setWorkout({
            ...entry.data(),
            createdAt: entry
              .data()
              .createdAt.toDate()
              .toISOString()
              .split('T')[0],
            key: props.route.params.workout.key,
          });
        }
      });

    return () => subscriber();
  }, [props.route.params.workout.key]);

  const deleteWorkout = () => {
    firestore()
      .collection('workouts')
      .doc(workout.key)
      .delete()
      .then(() => props.navigation.goBack());
  };

  const addExercise = () => {
    if (exercise !== '') {
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
    }
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
            <Text style={styles.text}>{workout.type} workout</Text>
            <Image style={styles.image} source={{ uri: workout.image }} />
            <Text style={styles.heading}>Date:</Text>
            <Text style={styles.date}>{workout.createdAt}</Text>
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
                {workout.exercises.length === 0 ? 'No exercises to show' : 'Exercises'}
              </Text>
              {workout.exercises.map((entry, index) => <Exercise item={entry} key={index} />)}
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
  image: {
    width: 250,
    height: 250,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    marginVertical: 20,
  },
  date: {
    color: '#20639b',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ViewDetailsScreen;
