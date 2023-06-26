import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { Button, Text, TextInput, AppBar } from '@react-native-material/core';

const Login = ({ navigation }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [disableStatus, setDisableStatus] = useState(false)

    const loginProcess = async () => {
        try {
            setDisableStatus(true)

            let das = await axios.post('API_URI/login', {
                name,
                password
            })
            if (das.status == 200) {
                if (das.data.role == "admin") {
                    navigation.navigate('Home', { info: das.data })
                } else {

                    navigation.navigate('See', { info: das.data })
                }
            }

            setDisableStatus(false)

        } catch (e) {
            Alert.alert("An Error Occured", "Try Again Later")
            setDisableStatus(false)
        }

    }
    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 0.5,
        }}>
            <AppBar
                title="Login"
            />
            <View >

                <TextInput label='Username' variant='standard' onChangeText={(text) => setName(text)} value={name} style={{
                    paddingTop: 10,
                    paddingLeft: 3
                }} />
                <TextInput label='Password' variant='standard' onChangeText={(text) => setPassword(text)} value={password} style={{
                    paddingTop: 10,
                    paddingLeft: 3
                }} />
                <Button
                    title="Login"
                    color='blue'
                    disabled={disableStatus}
                    onPress={loginProcess}
                    style={{
                        alignSelf: 'center'
                    }} />
            </View>


        </View>
    );
}

export default Login;