import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { signIn } from '../services/Auth';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Log In</Text>
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
                <Button title="Log In" onPress={async () => {
                    await signIn(email, password)
                }} />
            </View>
        </View>
    )
}

export default LoginForm

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
