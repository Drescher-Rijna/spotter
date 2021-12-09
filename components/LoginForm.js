import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { signIn } from '../services/Auth';

const LoginForm = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text>Log In</Text>
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
            <Button title="Log In" onPress={async () => {
                await signIn(email, password)
                navigation.navigate("Navigator");
            }} />
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

    input: {

    },

    button: {

    }
})
