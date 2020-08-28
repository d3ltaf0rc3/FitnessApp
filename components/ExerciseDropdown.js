import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import SetComponent from './Set';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import WorkoutContext from '../contexts/workout-context';

const ExerciseDropdown = (props) => {
    const context = useContext(WorkoutContext);
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const [exercises, setExercises] = useState(context.workout.exercises);

    const handlePress = () => {
        const index = exercises.findIndex(value => JSON.stringify(value) === JSON.stringify(props.item));
        const exercise = exercises[index];
        exercise.sets += `${reps} reps with ${weight}-`;
        setExercises(exercise);

        firestore()
            .collection("workouts")
            .doc(context.workout.key)
            .update({
                exercises
            })
            .then(() => {
                setWeight("");
                setReps("");
                context.update();
            });
    };

    return (
        <View style={styles.container}>
            {props.item.sets.length !== 0 ? props.item.sets.split("-").map((item, index) => {
                if (item === "") {
                    return null
                }
                return <SetComponent text={item} key={index} />
            }) : <Text style={styles.text}>No sets available</Text>}
            <View style={styles.newSetContainer}>
                <TextInput
                    value={reps}
                    onChangeText={text => setReps(text)}
                    placeholderTextColor="#101010"
                    placeholder="Reps..."
                    style={styles.input} />
                <TextInput
                    value={weight}
                    onChangeText={text => setWeight(text)}
                    placeholderTextColor="#101010"
                    placeholder="Weight..."
                    style={styles.input} />
                <Icon onPress={handlePress} name="add-outline" color="#fff" size={32} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 50,
        backgroundColor: "#48494b",
        borderWidth: 1,
        borderColor: "#3e424b",
        borderTopWidth: 0
    },
    input: {
        backgroundColor: "#363636",
        width: 80,
        height: 30,
        padding: 5,
        borderRadius: 5,
        color: "#fff"
    },
    newSetContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 10
    }
})

export default ExerciseDropdown;