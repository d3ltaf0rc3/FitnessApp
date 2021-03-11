import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import HomeScreen from './screens/home';
import AllWorkoutsScreen from './screens/all-workouts';
import AddAWorkoutScreen from './screens/add-a-workout';
import ViewDetailsScreen from './screens/view-details';
import UserContext from './contexts/user-context';
import context from './contexts/user-context';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const logIn = (respUser) => {
    setUser(respUser);
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => setUser(null))
      .catch((err) => console.error(err));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logIn,
        logOut,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={context.user ? 'Home' : 'Login'}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="All workouts" component={AllWorkoutsScreen} />
              <Stack.Screen name="Add a workout" component={AddAWorkoutScreen} />
              <Stack.Screen name="View details" component={ViewDetailsScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
