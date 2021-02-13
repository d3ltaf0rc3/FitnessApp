import React, { useContext } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Wrapper from '../components/Wrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import WorkoutsList from '../components/WorkoutsList';
import UserContext from '../contexts/user-context';
import Spinner from '../components/Spinner';

const HomeScreen = (props) => {
  const { user } = useContext(UserContext);
  const handlePress = () => props.navigation.navigate('Add a workout');

  if (!user) {
    return (
      <Wrapper title="Home">
        <Spinner />
      </Wrapper>
    );
  }

  return (
    <Wrapper title="Home">
      <Text style={styles.greeting}>Hello, {user.user.email}</Text>
      <Pressable onPress={handlePress} style={styles.addWorkoutContainer}>
        <Icon name="add-circle-outline" color="#fff" size={30} />
        <Text style={styles.text}>Add a workout</Text>
      </Pressable>
      <WorkoutsList type="some" />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  greeting: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
  },
  addWorkoutContainer: {
    flexDirection: 'row',
    backgroundColor: '#20639b',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 250,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    marginLeft: 7,
    fontSize: 16,
  },
});

export default HomeScreen;
