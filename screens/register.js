import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import UserContext from '../contexts/user-context';
import auth from '@react-native-firebase/auth';
import ErrorComponent from '../components/Error';

const RegisterScreen = () => {
  const context = useContext(UserContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handlePress = () => {
    if (email === '' || password === '' || rePassword === '') {
      setError('All fields must be filled!');
    } else if (rePassword === password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          context.logIn(user);
        })
        .catch((err) => {
          const message = err.message.split(' ');
          message.shift();
          setError(message.join(' '));
        });
    } else {
      setError('Both passwords must match!');
    }
  };

  return (
    <Wrapper title="Register">
      <View style={styles.form}>
        {error ? <ErrorComponent error={error} /> : null}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email..."
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Password..."
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Repeat password</Text>
        <TextInput
          secureTextEntry
          placeholder="Repeat password..."
          onChangeText={(text) => setRePassword(text)}
          style={styles.input}
        />
        <View style={styles.btnContainer}>
          <Button onPress={handlePress} text="Register" />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    width: 300,
  },
  input: {
    backgroundColor: '#fff',
    height: 35,
    padding: 4,
    borderRadius: 3,
  },
  label: {
    color: '#fff',
    marginVertical: 7,
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 35,
  },
});

export default RegisterScreen;
