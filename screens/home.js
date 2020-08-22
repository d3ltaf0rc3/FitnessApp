import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import WorkoutsList from '../components/WorkoutsList';

const HomeScreen = () => {
    const handlePress = () => {

    };

    return (
        <View style={styles.container}>
            <Header title="Home" />
            <Text style={styles.greeting}>Hello, Martin</Text>
            <TouchableOpacity onPress={handlePress} style={styles.addWorkoutContainer}>
                <Icon name="add-circle-outline" color="#fff" size={30}/>
                <Text style={styles.text}>Add a workout</Text>
            </TouchableOpacity>
            <WorkoutsList />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        display: "flex",
        alignItems: "center"
    },
    greeting: {
        color: "#fff",
        textAlign: "center",
        fontSize: 24,
        marginTop: 20
    },
    addWorkoutContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#20639b",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        width: 250,
        padding: 5,
        borderRadius: 5
    },
    text: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 16
    }
});

export default HomeScreen;