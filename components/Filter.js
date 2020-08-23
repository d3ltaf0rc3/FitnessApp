import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Filter = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.type} workout</Text>
            <CheckBox
                disabled={false}
                value={props.toggleCheckBox}
                onValueChange={(newValue) => props.setToggleCheckBox(newValue)} />
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 20
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 230
    }
})

export default Filter;