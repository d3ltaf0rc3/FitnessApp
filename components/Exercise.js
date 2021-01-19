import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown from './ExerciseDropdown';

const Exercise = (props) => {
  const [displayMenu, setDisplay] = useState(false);
  const handlePress = () => setDisplay(!displayMenu);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress} style={styles.container}>
        <Icon
          name={`arrow-${displayMenu ? 'up' : 'down'}-outline`}
          color="#b9bbb6"
          size={32}
        />
        <Text style={styles.exercise}>{props.item.name}</Text>
      </Pressable>
      {displayMenu ? <Dropdown item={props.item} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#363636',
    width: Dimensions.get('window').width - 50,
    borderWidth: 1,
    borderColor: '#3e424b',
    alignItems: 'center',
  },
  exercise: {
    marginLeft: 30,
    color: '#d9dddc',
    fontSize: 18,
  },
});

export default Exercise;
