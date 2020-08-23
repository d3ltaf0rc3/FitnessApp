import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Wrapper from '../components/Wrapper';
import AllWorkoutsList from '../components/AllWorkoutsList';
import Filter from '../components/Filter';

const AllWorkoutsScreen = () => {
    const [filters, setFilters] = useState(false);
    const [toggleBack, setToggleBack] = useState(false);
    const [toggleChest, setToggleChest] = useState(false);
    const [toggleGlutes, setToggleGlutes] = useState(false);
    const [toggleHamstrings, setToggleHamstrings] = useState(false);

    return (
        <Wrapper title="All workouts">
            <TouchableOpacity style={styles.btn} onPress={() => setFilters(!filters)}>
                <Text style={styles.text}>{filters ? "Hide filters" : "Show filters"}</Text>
            </TouchableOpacity>
            {filters && (
                <View style={styles.filtersContainer}>
                    <Filter
                        type="Back"
                        toggleCheckBox={toggleBack}
                        setToggleCheckBox={setToggleBack} />
                    <Filter
                        type="Chest"
                        toggleCheckBox={toggleChest}
                        setToggleCheckBox={setToggleChest} />
                    <Filter
                        type="Glutes"
                        toggleCheckBox={toggleGlutes}
                        setToggleCheckBox={setToggleGlutes} />
                    <Filter
                        type="Hamstrings"
                        toggleCheckBox={toggleHamstrings}
                        setToggleCheckBox={setToggleHamstrings} />
                </View>
            )}
            <AllWorkoutsList />
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#20639b",
        borderRadius: 3,
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 30
    },
    text: {
        color: "#fff",
        fontSize: 18
    },
    filtersContainer: {
        alignItems: "flex-end",
        marginTop: 10,
        padding: 15,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5
    }
})

export default AllWorkoutsScreen;