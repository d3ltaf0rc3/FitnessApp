import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Workout from './Workout';
import { useNavigation } from '@react-navigation/native';

const AllWorkoutsList = () => {
    const navigation = useNavigation();
    const data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }];
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>All of your workouts</Text>
            <View style={styles.dataContainer}>
                <FlatList
                    data={data}
                    renderItem={() => <Workout navigation={navigation} />}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        alignItems: "center"
    },
    heading: {
        color: "#fff",
        fontSize: 30
    },
    dataContainer: {
        marginTop: 10,
        paddingBottom: 200
    }
});

export default AllWorkoutsList;