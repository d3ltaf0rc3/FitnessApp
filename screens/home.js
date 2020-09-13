import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Wrapper from '../components/Wrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import WorkoutsList from '../components/WorkoutsList';
import UserContext from '../contexts/user-context';

const HomeScreen = (props) => {
    const context = useContext(UserContext);

    if (!context.user) {
        return <Wrapper title="Home"></Wrapper>
    }

    return (
        <Wrapper title="Home">
            <Text style={styles.greeting}>Hello, {context.user.user.email}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Add a workout")} style={styles.addWorkoutContainer}>
                <Icon name="add-circle-outline" color="#fff" size={30} />
                <Text style={styles.text}>Add a workout</Text>
            </TouchableOpacity>
            <WorkoutsList type="some" />
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    greeting: {
        color: "#fff",
        textAlign: "center",
        fontSize: 24,
        marginTop: 20
    },
    addWorkoutContainer: {
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
        marginLeft: 7,
        fontSize: 16
    }
});

export default HomeScreen;