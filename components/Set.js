import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SetComponent = () => {
    const handlePress = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Set No. 1 - 15 reps with 128 lbs</Text>
            <Icon onPress={handlePress} name="close-outline" color="#ed4956" size={28}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        marginVertical: 7,
        marginHorizontal: 5,
        color: "#fff",
        fontSize: 16
    }
})

export default SetComponent;