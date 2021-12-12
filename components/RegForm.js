import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { signUp } from '../services/Auth';

const RegForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.label}>Brugernavn:</Text>
            <TextInput 
                placeholder="Brugernavn"
                value={username}
                onChangeText={(val) => setUsername(val)}
                style={styles.input}
            />
            <Text style={styles.label}>E-mail:</Text>
            <TextInput 
                placeholder="E-mail"
                value={email}
                onChangeText={(val) => setEmail(val)}
                style={styles.input}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput 
                placeholder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                style={styles.input}
            />
            <Button title="Sign Up" onPress={()=>signUp(username, email, password)} />
        </View>
    )
}

export default RegForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    label: {
        fontSize: 16,
    },
    input: {
        fontSize: 14,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 10,
        width: 220,
        paddingHorizontal: 7,
        paddingVertical: 10
    },
})
