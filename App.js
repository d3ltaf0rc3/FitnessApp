import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import HomeScreen from './screens/home';
import AllWorkoutsScreen from './screens/all-workouts';
import AddAWorkoutScreen from './screens/add-a-workout';
import ViewDetailsScreen from './screens/view-details';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="All workouts" component={AllWorkoutsScreen} />
        <Stack.Screen name="Add a workout" component={AddAWorkoutScreen} />
        <Stack.Screen name="View details" component={ViewDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;