import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { signUp } from '../services/Auth';

const RegForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <Text>Brugernavn:</Text>
            <TextInput 
                placeholder="Brugernavn"
                value={username}
                onChangeText={(val) => setUsername(val)}
            />
            <Text>E-mail:</Text>
            <TextInput 
                placeholder="E-mail"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <Text>Password:</Text>
            <TextInput 
                placeholder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
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

    input: {

    },

    button: {

    }
})
