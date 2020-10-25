import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Wrapper from '../components/Wrapper';
import UserContext from '../contexts/user-context';
import auth from '@react-native-firebase/auth';
import ErrorComponent from '../components/Error';

const RegisterScreen = (props) => {
    const context = useContext(UserContext);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handlePress = () => {
        if (email === "" || password === "" || rePassword === "") {
            setError("All fields must be filled!");
        } else if (rePassword === password) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    context.logIn(user);
                    props.navigation.navigate("Home");
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setError('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        setError('That email address is invalid!');
                    }

                    setError(error.code);
                });
        } else {
            setError("Both passwords must match!");
        }
    };

    return (
        <Wrapper title="Register">
            <View style={styles.form}>
                {error ? <ErrorComponent error={error} /> : null}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Email..."
                    onChangeText={text => setEmail(text)}
                    style={styles.input} />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry
                    placeholder="Password..."
                    onChangeText={text => setPassword(text)}
                    style={styles.input} />
                <Text style={styles.label}>Repeat password</Text>
                <TextInput
                    secureTextEntry
                    placeholder="Repeat password..."
                    onChangeText={text => setRePassword(text)}
                    style={styles.input} />
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.btn}>Register</Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    form: {
        marginTop: 50
    },
    input: {
        backgroundColor: "#fff",
        width: 300,
        height: 30,
        padding: 4,
        borderRadius: 3
    },
    label: {
        color: "#fff",
        marginVertical: 7,
        fontSize: 14,
    },
    btn: {
        textAlign: "center",
        marginTop: 30,
        width: 300,
        backgroundColor: "#20639b",
        paddingVertical: 10,
        borderRadius: 5,
        color: "#fff",
        fontSize: 16
    }
});

export default RegisterScreen;