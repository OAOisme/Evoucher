import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { AppBar, Button, Text } from "@react-native-material/core";
import axios from "axios";


const VUDetails = ({ navigation, route }) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            axios.get(`API_URI/user/${route.params.userId}`).then(das => {
                if (das.status == 200) {
                    setData(das.data)
                }
            }
            )
        } catch (e) {
            Alert.alert("Error", "Something went wrong")

        }
    }

    const deleteUser = async () => {
        try {
            axios.delete(`API_URI/user/${route.params.userId}`).then(das => {
                if (das.status == 200) {
                    if (route.params.userId == route.params.info._id) {
                        navigation.navigate("Login")
                    } else {
                        navigation.navigate("Home", { info: route.info })
                    }
                }
            }
            )
        } catch (e) {
            Alert.alert("Error", "Something went wrong")

        }
    }


    useEffect(() => {
        fetchData()
    }
        , [])




    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            paddingBottom: 10,
            backgroundColor: "#fff"

        }}>
            <AppBar

                trailing={props =>
                (<Button
                    variant="text"
                    onPress={() => navigation.navigate("Home", { info: route.params.info })}
                    title="Home"
                    color="white"
                />)}
                title="User Details"
            />
            <View style={{
                flex: 0.5,
                justifyContent: "space-between",
                flexDirection: "column",
                padding: 10,
                backgroundColor: "#fff"
            }}>


                <Image
                    source={require("./logo.jpg")}
                    style={{
                        width: 100,
                        height: 100,
                        alignSelf: "center"
                    }}
                />
                <Text>Name: {data.name}</Text>
                <Text>Branch: {data.branch}</Text>
                <Text>Password: {data.password}</Text>
                <Text>Role: {data.role}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"

                }}>


                    <Button
                        style={{
                            margin: 10
                        }}
                        onPress={() => deleteUser()}
                        title="Delete User"
                        color="red"
                    />
                    <Button
                        style={{
                            margin: 10
                        }}
                        onPress={() => navigation.navigate("Home", { info: route.params.info })}
                        title="Home"
                        color="purple"
                    />
                </View>

            </View>
        </View>
    )
}

export default VUDetails;