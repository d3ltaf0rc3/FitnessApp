import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Workout = (props) => {
    const handlePress = () => {
        props.navigation.navigate("View details");
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: "https://naturalsteroidalternatives.com/wp-content/uploads/2019/02/beginners-back-workout.jpg" }} />
            <Text style={styles.text}>Back workout</Text>
            <Text style={styles.text}>Date: 22.08.20</Text>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.text}>View Details</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 3,
        borderColor: "#20639b",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    image: {
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 1,
        height: 150,
        width: 150,
        marginVertical: 10
    },
    text: {
        color: "#fff",
        fontSize: 20
    },
    button: {
        color: "#fff",
        backgroundColor: "#20639b",
        paddingVertical: 8,
        paddingHorizontal: 35,
        borderRadius: 3,
        marginTop: 10
    }
})

export default Workout;