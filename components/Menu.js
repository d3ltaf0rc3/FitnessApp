import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import UserContext from '../contexts/user-context';

const Menu = (props) => {
  const context = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Icon style={styles.btn} onPress={props.handleClick} name="close-outline" color="#0066cc" size={46} />
      <View style={styles.linkContainer}>
        {context.user !== null ?
          <>
            <Link to="/Home" onPress={props.handleClick} style={styles.link}>Home</Link>
            <Link to="/All workouts" onPress={props.handleClick} style={styles.link}>All Workouts</Link>
            <Link to="/Add a workout" onPress={props.handleClick} style={styles.link}>Add a workout</Link>
            <Text onPress={context.logOut} style={styles.link}>Logout</Text>
          </> :
          <>
            <Link to="/Login" onPress={props.handleClick} style={styles.link}>Login</Link>
            <Link to="/Register" onPress={props.handleClick} style={styles.link}>Register</Link>
          </>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 170,
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  link: {
    marginTop: 20,
    color: '#0066cc',
    fontSize: 20,
  },
  linkContainer: {
    marginTop: 70,
    textAlign: 'center',
  },
});

export default Menu;
