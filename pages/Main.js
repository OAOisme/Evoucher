import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { AppBar, Button, Text, TextInput } from '@react-native-material/core';

const Main = ({ navigation, route }) => {

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [disableStatus, setDisableStatus] = useState(false)
    const data = route.params.info


    const addItem = async () => {
        try {
            setDisableStatus(true)

            let das = await axios.post('API_URI/voucher/add', {
                name: data._id,
                branch: data.branch,
                description,
                amount: parseFloat(amount)
            })
            if (das.status == 200) {
                Alert.alert(das.data)
                if (data.role == "admin") {
                    navigation.navigate('Home', { info: data })
                } else {
                    navigation.navigate('See', { info: data })
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
            padding: 10
        }}>
            <AppBar
                title="Add Voucher"
            />
            <Text style={{

                marginBottom: 10
            }}>Name: {data.name}</Text>
            <Text
            >Branch: {data.branch}</Text>
            <TextInput label='Description'
                variant='standard'
                onChangeText={(text) => { setDescription(text) }}
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                }}
                value={description} />
            <TextInput label='Amount' keyboardType='numeric'
                variant='standard'
                onChangeText={(text) => { setAmount(text) }
                }
                value={amount}
            />
            <View style={
                {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                }} >


                <Button onPress={addItem} disabled={disableStatus}
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        marginRight: 10,
                    }}
                    title="Add"
                    color='white'
                />
                <Button onPress={() => {
                    if (data.role == "admin") {
                        navigation.navigate('Home', { info: data })
                    } else {
                        navigation.navigate('See', { info: data })
                    }
                }} disabled={disableStatus}
                    style={{
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                    title="Cancel"
                    color='red'
                />
            </View>


        </View >
    )
}

export default Main;