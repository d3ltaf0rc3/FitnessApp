import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Workout from './Workout';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

const WorkoutsList = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('workouts')
            .orderBy("createdAt", "desc")
            .limit(7)
            .onSnapshot(querySnapshot => {
                const workouts = [];

                querySnapshot.forEach(documentSnapshot => {
                    workouts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setWorkouts(workouts);
                setLoading(false);
            });

        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your last 7 workouts</Text>
            <FlatList
                style={styles.dataContainer}
                data={workouts}
                renderItem={(item) => <Workout item={item.item} navigation={navigation} />}
                keyExtractor={item => item.key} />
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
    }
});

export default WorkoutsList;