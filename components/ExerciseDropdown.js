import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import SetComponent from './Set';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ExerciseDropdown = (props) => {
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const handlePress = () => {
        firestore()
        .collection("workouts")
        .doc(props.id)
        .update({
            "exercises": firestore.FieldValue.arrayUnion(`${reps} reps with ${weight}`)
        });
    };

    return (
        <View style={styles.container}>
            {props.sets.length !== 0 ? props.sets.map(() => <SetComponent />) : <Text style={styles.text}>No sets available</Text>}
            <View style={styles.newSetContainer}>
                <TextInput
                    onChangeText={text => setReps(text)}
                    placeholderTextColor="#101010"
                    placeholder="Reps..."
                    style={styles.input} />
                <TextInput
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