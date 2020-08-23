import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import Header from '../components/Header';
import Exercise from '../components/Exercise';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewDetailsScreen = () => {
    const data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }];

    const deleteWorkout = () => {

    };

    const addExercise = () => {

    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Header title="View Details" />
                <Text style={styles.text}>Back workout</Text>
                <Image
                    style={styles.image}
                    source={{ uri: "https://naturalsteroidalternatives.com/wp-content/uploads/2019/02/beginners-back-workout.jpg" }} />
                <View style={styles.dateContainer}>
                    <Text style={styles.heading}>Date:</Text>
                    <Text style={styles.date}>23-8-20</Text>
                </View>
                <View>
                    <Text style={styles.heading}>Add an exercise</Text>
                    <View style={styles.addContainer}>
                        <TextInput placeholder="Exercise..." style={styles.input} />
                        <Icon onPress={addExercise} name="arrow-forward-outline" color="#b9bbb6" size={32} />
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Text style={styles.heading}>Exercises</Text>
                    {data.map(item => <Exercise key={item.id} />)}
                </View>
                <TouchableOpacity onPress={deleteWorkout} style={styles.btn}>
                    <Icon name="trash-outline" color="#fff" size={16} />
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        display: "flex"
    },
    image: {
        width: 250,
        height: 250,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5
    },
    text: {
        color: "#fff",
        fontSize: 30,
        marginVertical: 20
    },
    dateContainer: {
        alignItems: "center",
        marginVertical: 20
    },
    heading: {
        color: "#fff",
        fontSize: 26
    },
    date: {
        color: "#20639b",
        fontSize: 24
    },
    btn: {
        marginVertical: 30,
        width: 120,
        height: 30,
        backgroundColor: "#ed4956",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        flexDirection: "row"
    },
    btnText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 8
    },
    exerciseContainer: {
        marginVertical: 20
    },
    input: {
        backgroundColor: "#808588",
        width: Dimensions.get("window").width - 80,
        borderRadius: 10
    },
    addContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})

export default ViewDetailsScreen;