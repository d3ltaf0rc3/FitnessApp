import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import Wrapper from '../components/Wrapper';
import Exercise from '../components/Exercise';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewDetailsScreen = (props) => {
    const item = props.route.params.item;
    const date = props.route.params.item.createdAt.toDate().toISOString().split("T")[0];

    const deleteWorkout = () => {

    };

    const addExercise = () => {

    };

    return (
        <ScrollView style={styles.container}>
            <Wrapper title="View Details">
                <Text style={styles.text}>{item.type} workout</Text>
                <Image
                    style={styles.image}
                    source={{ uri: item.image }} />
                <Text style={styles.heading}>Date:</Text>
                <Text style={styles.date}>{date}</Text>
                <View>
                    <Text style={styles.heading}>Add an exercise</Text>
                    <View style={styles.addContainer}>
                        <TextInput placeholder="Exercise..." style={styles.input} />
                        <Icon onPress={addExercise} name="arrow-forward-outline" color="#b9bbb6" size={32} />
                    </View>
                </View>
                <View>
                    <Text style={styles.heading}>{props.route.params.item.exercises.length === 0 ?
                        "No exercises to list" : "Exercises"}</Text>
                    {props.route.params.item.exercises.map(item => <Exercise key={item.id} />)}
                </View>
                <TouchableOpacity onPress={deleteWorkout} style={styles.btn}>
                    <Icon name="trash-outline" color="#fff" size={16} />
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </Wrapper>
        </ScrollView>
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
    input: {
        backgroundColor: "#808588",
        width: Dimensions.get("window").width - 80,
        borderRadius: 10
    },
    addContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    }
})

export default ViewDetailsScreen;