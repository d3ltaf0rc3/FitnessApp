import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Workout from './Workout';

const WorkoutsList = () => {
    const data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }];
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your last 7 workouts</Text>
            <View style={styles.dataContainer}>
                <FlatList
                    data={data}
                    renderItem={Workout}
                    keyExtractor={item => item.id} />
            </View>
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
        paddingBottom: 250
    }
});

export default WorkoutsList;