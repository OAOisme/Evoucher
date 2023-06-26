import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import axios from "axios";
import { AppBar, Button, Text, TextInput } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";

const Users = ({ navigation, route }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' }
    ]);

    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const [disableStatus, setDisableStatus] = useState(false);

    const addUser = async () => {
        try {
            setDisableStatus(true);
            let das = await axios.post("API_URI/users", {
                name,
                branch,
                password,
                role: value
            });
            if (das.status == 200) {
                alert("Success");
                navigation.navigate("Home", { info: route.params.info });
            }
            setDisableStatus(false);
        } catch (e) {
            Alert.alert("An Error Occured", "Try Again Later");
            setDisableStatus(false);
        }
    };


    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            paddingBottom: 10,
            backgroundColor: "#fff",
            padding: 10

        }}>
            <AppBar

                trailing={props =>
                (<Button
                    variant="text"
                    onPress={() => navigation.navigate("Home", { info: route.params.info })}
                    title="Home"
                    color="white"
                />)}
                title="Add User"
            />
            <View style={{
                flex: 0.5,
                justifyContent: "space-between",
                flexDirection: "column",
                paddingBottom: 10
            }}>
                <TextInput
                    label="Name"
                    variant="standard"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Branch"
                    variant="standard"
                    value={branch}
                    onChangeText={text => setBranch(text)}
                />
                <TextInput
                    label="Password"
                    variant="standard"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <Button
                    onPress={addUser}
                    title="Add"
                    disabled={disableStatus}
                />


            </View>
        </View>
    )
}

export default Users