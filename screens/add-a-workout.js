import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { Picker } from "@react-native-community/picker";

const AddAWorkoutScreen = () => {
    const [type, setType] = useState();
    const date = (new Date()).toISOString().substring(0, 10);

    const handlePress = () => {

    };

    return (
        <View style={styles.container}>
            <Header title="Add a workout" />
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Choose a workout type:</Text>
                <Picker
                    selectedValue={type}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setType(itemValue)
                    }>
                    <Picker.Item label="Back workout" value="Back" />
                    <Picker.Item label="Chest workout" value="Chest" />
                    <Picker.Item label="Glutes workout" value="Glutes" />
                    <Picker.Item label="Hamstrings workout" value="Hamstrings" />
                </Picker>
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Date:</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handlePress}>
                <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
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
    picker: {
        height: 40,
        width: 180,
        marginVertical: 10,
        backgroundColor: "#797979",
        color: "#fff"
    },
    text: {
        color: "#fff",
        fontSize: 24
    },
    date: {
        color: "#20639b",
        fontSize: 30
    },
    innerContainer: {
        marginTop: 30,
        alignItems: "center"
    },
    btn: {
        marginTop: 50,
        backgroundColor: "#20639b",
        width: 200,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    }
})

export default AddAWorkoutScreen;