import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Wrapper from '../components/Wrapper';
import auth from '@react-native-firebase/auth';
import ErrorComponent from '../components/Error';
import UserContext from '../contexts/user-context';

const LoginScreen = (props) => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context = useContext(UserContext);

    const handlePress = () => {
        if (email !== "" && password !== "") {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    context.logIn(user);
                    props.navigation.navigate("Home");
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        setError('That email address is invalid!');
                    }
                    setError(error.code);
                });
        } else {
            setError("Both fields must be completed!");
        }
    };

    return (
        <Wrapper title="Login">
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
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.btn}>Login</Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    form: {
        marginTop: 60
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
        fontSize: 14
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

export default LoginScreen;