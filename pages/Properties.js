import React, { useEffect, useState } from "react"
import { Alert, View, Image } from "react-native"
import { Button, Text } from "@react-native-material/core"
import axios from "axios"

const Properties = ({ navigation, route }) => {
    const data = route.params.info
    const id = route.params.id
    const [vData, setVData] = useState({})
    const [vData2, setVData2] = useState({})
    const [approver, setApprover] = useState({})

    const approve = async () => {
        try {
            let das = await axios.get(`API_URI/approve/${id}`, {
                params: {
                    userId: data._id,
                }
            })
            if (das.status == 200) {
                Alert.alert("Approved")
                navigation.navigate("Home", { info: data })
            }
        } catch (e) {
            Alert.alert("Error")
        }
    }


    const ApproveButton = () => {
        return (
            <View>

                <Button
                    onPress={approve}
                    style={{
                        alignSelf: "center",
                    }}
                    color="green"
                    mode="contained"
                    title="Approve"
                />
                <Button
                    color="red"
                    mode="contained"
                    title="Reject"
                    onPress={async () => {
                        try {
                            let das = await axios.get(`API_URI/delete/${id}`)
                            if (das.status == 200) {
                                Alert.alert("Deleted")
                                navigation.navigate("Home", { info: data })
                            }
                        } catch (e) {
                            console.log(e)
                            Alert.alert("Error")
                        }
                    }
                    }

                />
            </View>
        )
    }

    const voucherData = async () => {
        try {
            let url = "API_URI/voucher/" + id
            let das = await axios.get(url)
            if (das.status == 200) {
                setVData(das.data.voucher)
                setVData2(das.data.theuser)
                setApprover(das.data.approver)
            }
        }
        catch (e) {
            Alert.alert(e)
        }

    }


    useEffect(() => {
        voucherData()
    }, [])

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1,
            padding: 10,
        }}>


            <View style={{
                flex: 0.5,
                justifyContent: "space-between",
                flexDirection: "column",
                paddingBottom: 10,
                backgroundColor: "#fff"
            }}>
                <Image
                    source={require("../images/logo.jpg")}
                    style={{
                        width: 100,
                        height: 100,
                        alignSelf: "center"
                    }}
                />
                <Text variant="h6" style={{
                    textAlign: "center",
                }}>ABOUND INTERNATIONAL</Text>
                <Text>Name: {vData2.name}</Text>
                <Text>Branch: {vData.branch}</Text>
                <Text>Description: {vData.description}</Text>
                <Text>Amount: {vData.value}</Text>
                <Text style={{
                    color: vData.status == "approved" ? "limegreen" : "red"
                }}>Status: {vData.status}</Text>
                <Text>Date: {vData.date}</Text>
                {vData.status == "approved" ? <Text>Approved By: {approver.name}</Text> : null}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around"

                    }}>


                    {data.role == "admin" && vData.status == "processing" ? <ApproveButton /> : null}
                    <Button onPress={() => {
                        if (data.role == "admin") {

                            navigation.navigate('Home', { info: data })
                        } else {

                            navigation.navigate('See', { info: data })
                        }
                    }}
                        title="Back"
                        style={{
                            alignSelf: 'center',
                        }}
                        color="red" />



                </View>


            </View>
        </View>
    )
}
export default Properties;