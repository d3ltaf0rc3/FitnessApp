import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Workout from './Workout';
import firestore from '@react-native-firebase/firestore';
import Spinner from './Spinner';

const WorkoutsList = (props) => {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('workouts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const wrkts = [];

        querySnapshot.forEach((documentSnapshot) => {
          wrkts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        if (props.type === 'some') {
          setWorkouts(wrkts.slice(0, 5));
        } else {
          setWorkouts(wrkts);
        }
        setLoading(false);
      });

    return () => subscriber();
  }, [props.type]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      {workouts.length !== 0 ? (
        <>
          <Text style={styles.heading}>
            {props.type === 'all'
              ? 'All of your workouts'
              : 'Your last 5 workouts'}
          </Text>
          <FlatList
            style={props.type === 'all' ? styles.allData : styles.dataContainer}
            data={workouts}
            renderItem={(item) => <Workout item={item.item} />}
            keyExtractor={(item) => item.key}
          />
        </>
      ) : (
          <Text style={styles.heading}>No workouts to display</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  heading: {
    color: '#fff',
    fontSize: 30,
  },
  dataContainer: {
    marginBottom: 170,
  },
  allData: {
    marginBottom: 80,
  },
});

export default WorkoutsList;
