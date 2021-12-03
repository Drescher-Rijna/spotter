import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


export default function CreateStepOne() {
    return (
        <View>
            <Formik
                initialValues={{ title: '', location: '', category: '', body: '',  }}
                onSubmit={(values) => {

                }}
            >
                {(props) => (
                    <View>
                        {/* TITLE */}
                        <TextInput 
                            placeholder='Spot name'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />

                        {/* LOCATION */}
                        <TextInput 
                            placeholder='Location'
                            onChangeText={props.handleChange('location')}
                            value={props.values.location}
                        />

                        {/* CATEGORY */}
                        <TextInput 
                            placeholder='Category'
                            onChangeText={props.handleChange('category')}
                            value={props.values.category}
                        />

                        {/* DESCRIPTION */}
                        <TextInput 
                            placeholder='Description'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

