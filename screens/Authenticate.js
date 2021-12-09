import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';

export default function Authenticate() {
    // toggle state between register and login form (false = login, true = register)
    const [register, setRegister] = useState(false);

    return (
        <View style={{flex: 1}}>
            {register ? 
                <RegForm register={register}/> 
                
                : 
                <LoginForm register={register} />
            }
            
            { /*register ?
                <View>
                    <Text>Already have an account?</Text>
                    <Text onPress={setRegister(false)}>Log in</Text>
                </View>
                :
                <View>
                    <Text>Don't have an account?</Text>
                    <Text onPress={setRegister(true)}>Sign up</Text>
                </View>
            */}
        </View>
    )
}

const styles = StyleSheet.create({})
