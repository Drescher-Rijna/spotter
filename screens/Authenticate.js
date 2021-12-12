import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';

export default function Authenticate() {
    // toggle state between register and login form (false = login, true = register)
    const [register, setRegister] = useState(false);

    const handleToggle = () => {
        setRegister(!register);
        console.log(register)
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            {register ? 
                <RegForm register={register}/> 
                
                : 
                <LoginForm register={register} />
            }
            
            
                <View style={styles.links}>
                    <Text>
                        {register ?
                            'Already have an account?'
                            : 
                            "Don't have an account?"
                        }
                    </Text>
                    <TouchableOpacity  onPress={handleToggle}>
                        <Text style={styles.link}>
                            {register ?
                                'Log in'
                                : 
                                "Sign up"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    links: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15
    },
    link: {
        textDecorationLine: 'underline',
        color: 'dodgerblue',
        marginLeft: 5
    }
})
