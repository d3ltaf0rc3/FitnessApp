import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CloseIcon from 'react-native-vector-icons/Ionicons';

const Menu = (props) => {
    return (
        <View style={styles.container}>
            <CloseIcon style={styles.btn} onPress={props.handleClick} name="close-outline" color="#fff" size={40} />
            <View style={styles["link-container"]}>
                <Text style={styles.link}>Login</Text>
                <Text style={styles.link}>Register</Text>
                <Text style={styles.link}>Home</Text>
                <Text style={styles.link}>All Workouts</Text>
                <Text style={styles.link}>Add a workout</Text>
                <Text style={styles.link}>Logout</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "#455a64",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: 170,
        alignItems: "center"
    },
    btn: {
        position: "absolute",
        top: 5,
        right: 5
    },
    link: {
        marginTop: 20,
        color: "#fff",
        fontSize: 20
    },
    "link-container": {
        marginTop: 70,
        textAlign: "center"
    }
})

export default Menu;