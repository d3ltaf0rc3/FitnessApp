import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wrapper from '../components/Wrapper';
import WorkoutsList from '../components/WorkoutsList';
import UserContext from '../contexts/user-context';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

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
      <View>
        <Text style={styles.greeting}>Hello, {user.user.email}</Text>
        <Button
          onPress={handlePress}
          text="Add a workout"
          icon="add-circle-outline"
        />
        <WorkoutsList type="some" />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  greeting: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 20,
  },
  text: {
    color: '#fff',
    marginLeft: 7,
    fontSize: 16,
  },
});

export default HomeScreen;
