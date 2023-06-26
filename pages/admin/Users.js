import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import axios from "axios";
import { AppBar, Button, Text } from "@react-native-material/core";
import { DataTable } from "react-native-paper";

const Users = ({ navigation, route }) => {

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            axios.get(`API_URI/users`).then(das => {
                if (das.status == 200) {
                    setUsers(das.data)
                }
            }
            )
        } catch (e) {
            Alert.alert("Error", "Something went wrong")
        }
    }

    useEffect(() => {
        fetchUsers()
    }
        , [])

    return (
        <View style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "column",
            paddingBottom: 10

        }}>
            <AppBar

                trailing={props =>
                (<Button
                    variant="text"
                    onPress={() => navigation.navigate("Home", { info: route.params.info })}
                    title="Home"
                    color="white"
                />)}
                title="Users"
            />
            <ScrollView style={{
                padding: 10
            }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Branch</DataTable.Title>
                    </DataTable.Header>

                    {users.map((user, index) => {
                        return (
                            <DataTable.Row key={index}
                                style={{
                                    borderColor: "#000",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginBottom: 5,
                                    marginTop: 5

                                }}

                                onPress={() => navigation.navigate("VUDetails", { userId: user._id, info: route.params.info })}
                            >
                                <DataTable.Cell>{user.name}</DataTable.Cell>
                                <DataTable.Cell>{user.branch}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    }
                    )}
                </DataTable>
            </ScrollView>
            <View>
                <Button
                    color="primary"
                    onPress={() => navigation.navigate("AddUser", { info: route.params.info })}
                    style={{
                        alignSelf: "center",
                    }}
                    title="Add User"
                />
            </View>
        </View>
    )
}

export default Users;
