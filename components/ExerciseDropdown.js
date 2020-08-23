import React from 'react';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
import SetComponent from './Set';
import Icon from 'react-native-vector-icons/Ionicons';

const ExerciseDropdown = () => {
    const handlePress = () => {

    };

    return (
        <View style={styles.container}>
            <SetComponent />
            <SetComponent />
            <SetComponent />
            <View style={styles.newSetContainer}>
                <TextInput placeholder="Reps..." style={styles.input} />
                <TextInput placeholder="Weight..." style={styles.input} />
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
        borderRadius: 5
    },
    newSetContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
})

export default ExerciseDropdown;