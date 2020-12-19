import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Workout from './Workout';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

const WorkoutsList = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('workouts')
            .orderBy("createdAt", "desc")
            .onSnapshot(querySnapshot => {
                const workouts = [];

                querySnapshot.forEach(documentSnapshot => {
                    workouts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                if (props.type === "some") {
                    setWorkouts(workouts.slice(0, 5));
                } else {
                    setWorkouts(workouts);
                }
                setLoading(false);
            });

        return () => subscriber();
    }, [props.type]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {workouts.length !== 0 ?
                <>
                    <Text style={styles.heading}>{props.type === "all" ?
                        "All of your workouts" : "Your last 5 workouts"}</Text>
                    <FlatList
                        style={props.type === "all" ? styles.allData : styles.dataContainer}
                        data={workouts}
                        renderItem={(item) => <Workout item={item.item} />}
                        keyExtractor={item => item.key} />
                </> :
                <Text style={styles.heading}>No workouts to display</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },
    heading: {
        color: "#fff",
        fontSize: 30
    },
    dataContainer: {
        marginBottom: 170
    },
    allData: {
        marginBottom: 80
    },
    spinner: {
        marginTop: 40
    }
});

export default WorkoutsList;