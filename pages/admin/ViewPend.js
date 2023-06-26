import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { DataTable } from "react-native-paper";
import { AppBar, Button } from "@react-native-material/core";

const ViewPend = ({ navigation, route }) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        let lists = await axios.get("API_URI/pending")
        if (lists.status == 200) {
            setData(lists.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <ScrollView>
            <AppBar
                title="Pending Vouchers"
            />

            <DataTable style={{
                padding: 10
            }}>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Branch</DataTable.Title>
                    <DataTable.Title>Amount</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Description</DataTable.Title>
                </DataTable.Header>


                {data.map((item, index) => {
                    return (
                        <DataTable.Row key={index} style={{
                            borderColor: "red",
                            borderWidth: 1,
                            borderRadius: 5,
                            marginBottom: 5,
                            marginTop: 5,
                            padding: 5
                        }}
                            onPress={() => {
                                navigation.navigate("Properties", { info: route.params.info, id: item._id })
                            }}
                        >
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell>{item.branch}</DataTable.Cell>
                            <DataTable.Cell>{item.value}</DataTable.Cell>
                            <DataTable.Cell>{item.date}</DataTable.Cell>
                            <DataTable.Cell>{item.description.substring(0, 10) + "..."}</DataTable.Cell>
                        </DataTable.Row>
                    )

                })
                }
            </DataTable>

            <Button
                style={{
                    alignSelf: "center",
                    margin: 10
                }}
                onPress={() => {
                    navigation.navigate("Home", { info: route.params.info })
                }
                }
                title="Back"
                color="red"
            />

        </ScrollView>
    )


}


export default ViewPend