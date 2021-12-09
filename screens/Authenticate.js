import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';

export default function Authenticate() {
    // toggle state between register and login form (false = login, true = register)
    const [register, setRegister] = useState(true);

    return (
        <View>
            {register ? <RegForm /> : <LoginForm />}
        </View>
    )
}

const styles = StyleSheet.create({})
