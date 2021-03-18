import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../components/Wrapper';
import Exercise from '../components/Exercise';
import DetailsHeader from '../components/DetailsHeader';
import WorkoutContext from '../contexts/workout-context';
import Spinner from '../components/Spinner';

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
          <Pressable onPress={deleteWorkout} style={styles.btn}>
            <Icon name="trash-outline" color="#fff" size={20} />
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </Wrapper>
      </ScrollView>
    </WorkoutContext.Provider>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#fff',
    fontSize: 26,
  },
  btn: {
    marginVertical: 30,
    width: 180,
    height: 40,
    backgroundColor: '#ed4956',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#808588',
    width: Dimensions.get('window').width - 80,
    borderRadius: 10,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default ViewDetailsScreen;
