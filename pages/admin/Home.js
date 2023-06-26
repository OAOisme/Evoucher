import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import { AppBar, Button, Text } from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import { DataTable } from 'react-native-paper';

const Home = ({ navigation, route }) => {

    const [data, setData] = useState([])
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const getData = async (thedate) => {
        try {
            let das = await axios.post(`API_URI/vouchershow`, {
                date: new Date(thedate)
            })
            if (das.status == 200) {
                setData(das.data)
            }
        } catch (e) {
            Alert.alert("Error", "Something went wrong")


        }
    }

    const userPage = () => navigation.navigate("Users", { info: route.params.info })

    const fetchData = async () => {
        try {
            axios.get(`API_URI/vouchershow`).then(das => {
                if (das.status == 200) {
                    setData(das.data)
                }
            })
        } catch (e) {
            Alert.alert("Error", "Something went wrong")

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (data.length == 0) {
        return (

            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                paddingBottom: 10

            }}>
                <AppBar
                    title="Vouchers"

                    trailing={props =>
                    (<Button
                        variant="text"
                        title="Users"
                        style={{
                            marginEnd: 4
                        }}
                        onPress={userPage}
                        compact
                        {...props}
                    />)

                    }
                />


                <DatePicker
                    style={{
                        display: open ? 'flex' : 'none',

                    }}
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={async (date) => {
                        setOpen(false)
                        await setDate(date)
                        getData(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10

                    }}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>Select Date:</Text>
                        <Button title="Open" onPress={() => setOpen(true)} style={{
                            alignSelf: 'center'
                        }} />
                    </View>

                    <Text style={{
                        textAlign: 'center'
                    }}>No Data for this Date</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10

                    }}>

                        <Button
                            onPress={() => {
                                navigation.navigate('Main', { info: route.params.info })
                            }}
                            style={{
                                alignSelf: 'center'

                            }}
                            title="Add Voucher"
                        />

                        <Button
                            onPress={() => {
                                navigation.navigate('ViewPend', { info: route.params.info })
                            }}
                            style={{
                                alignSelf: 'center'
                            }}
                            color="blue"
                            title="View Pending"
                        />

                    </View>

                </View>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <View
                    style={{

                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                        paddingBottom: 10

                    }}
                >
                    <AppBar
                        title="Vouchers"
                    />
                    <DatePicker
                        style={{
                            display: open ? 'flex' : 'none'
                        }}
                        modal
                        open={open}
                        date={date}
                        mode="date"
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            getData()
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <View style={
                        {
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            flex: 1,
                            marginTop: 3,
                            paddingBottom: 10
                        }
                    }>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10

                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>Select Date:</Text>
                            <Button title="Open" onPress={() => setOpen(true)} style={{
                                alignSelf: 'center'
                            }} />
                        </View>

                        <View
                            style={{
                                padding: 10
                            }}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Description</DataTable.Title>
                                    <DataTable.Title>Amount</DataTable.Title>
                                    <DataTable.Title>Branch</DataTable.Title>
                                </DataTable.Header>
                                {data.map((item, index) => {
                                    return (
                                        <DataTable.Row
                                            key={index}

                                            style={{
                                                borderColor: item.status == "approved" ? 'limegreen' : 'red',

                                                borderWidth: 1,
                                                borderRadius: 5,
                                                margin: 5
                                            }}
                                            onPress={() => {
                                                navigation.navigate('Properties', { info: route.params.info, id: item._id })
                                            }}
                                        >
                                            <DataTable.Cell>{item.description.substring(0, 10) + "..."}</DataTable.Cell>
                                            <DataTable.Cell>{item.value}</DataTable.Cell>
                                            <DataTable.Cell>{item.branch}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                }
                                )}
                            </DataTable>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10

                    }}>

                        <Button
                            onPress={() => {
                                navigation.navigate('Main', { info: route.params.info })
                            }}
                            style={{
                                alignSelf: 'center'

                            }}
                            title="Add Voucher"
                        />

                        <Button
                            onPress={() => {
                                navigation.navigate('ViewPend', { info: route.params.info })
                            }}
                            style={{
                                alignSelf: 'center'
                            }}
                            color="blue"
                            title="View Pending"
                        />

                        <Button
                            onPress={userPage}
                            title="Users"
                            style={{
                                alignSelf: 'center'
                            }}
                        />


                    </View>
                </View>
            </ScrollView>
        )
    }



}

export default Home;