import React, { useContext } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import WorkoutContext from '../contexts/workout-context';

const DetailsHeader = () => {
    const { workout } = useContext(WorkoutContext);

    return (
        <>
            <Text style={styles.text}>{workout.type} workout</Text>
            <Image
                style={styles.image}
                source={{ uri: workout.image }} />
            <Text style={styles.heading}>Date:</Text>
            <Text style={styles.date}>{workout.createdAt.toDate().toISOString().split("T")[0]}</Text>
        </>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20
    },
    text: {
        color: "#fff",
        fontSize: 30,
        marginVertical: 20
    },
    heading: {
        color: "#fff",
        fontSize: 26
    },
    date: {
        color: "#20639b",
        fontSize: 24,
        marginBottom: 20
    }
})

export default DetailsHeader;