import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Workout from './Workout';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const AllWorkoutsList = () => {
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
            {workouts.length !== 0 ?
                <>
                    <Text style={styles.heading}>All of your workouts</Text>
                    <View style={styles.dataContainer}>
                        <FlatList
                            data={workouts}
                            renderItem={(item) => <Workout item={item.item} navigation={navigation} />}
                            keyExtractor={item => item.key} />
                    </View>
                </> :
                <Text style={styles.heading}>No workouts to display</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        alignItems: "center"
    },
    heading: {
        color: "#fff",
        fontSize: 30
    },
    dataContainer: {
        marginTop: 10,
        paddingBottom: 200
    }
});

export default AllWorkoutsList;