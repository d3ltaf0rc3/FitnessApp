import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
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

const ViewDetailsScreen = (props) => {
  const [exercise, setExercise] = useState();
  const [item, setItem] = useState(props.route.params.item);

  useEffect(() => {
    const subscriber = firestore()
      .collection('workouts')
      .doc(props.route.params.item.key)
      .onSnapshot((entry) =>
        setItem({ ...entry._data, key: props.route.params.item.key }),
      );

    return () => subscriber();
  }, [props.route.params.item.key]);

  const deleteWorkout = () => {
    firestore()
      .collection('workouts')
      .doc(item.key)
      .delete()
      .then(() => {
        props.navigation.goBack();
      });
  };

  const addExercise = () => {
    firestore()
      .collection('workouts')
      .doc(item.key)
      .update({
        exercises: firestore.FieldValue.arrayUnion({
          name: exercise,
          sets: '',
        }),
      })
      .then(() => {
        setExercise('');
      });
  };

  return (
    <WorkoutContext.Provider value={{ workout: item }}>
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
              {item.exercises.length === 0
                ? 'No exercises to list'
                : 'Exercises'}
            </Text>
            {item.exercises.map((entry, index) => (
              <Exercise item={entry} key={index} />
            ))}
          </View>
          <TouchableOpacity onPress={deleteWorkout} style={styles.btn}>
            <Icon name="trash-outline" color="#fff" size={16} />
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
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
    width: 120,
    height: 30,
    backgroundColor: '#ed4956',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#808588',
    width: Dimensions.get('window').width - 80,
    borderRadius: 10,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ViewDetailsScreen;
