import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Main from './pages/Main';
import See from './pages/See';
import Properties from './pages/Properties';
import ViewPend from './pages/admin/ViewPend';
import Home from './pages/admin/Home';
import Users from './pages/admin/Users';
import AddUser from './pages/admin/AddUser';
import VUDetails from './pages/admin/VUDetails';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="See" component={See} />
        <Stack.Screen name="Properties" component={Properties} />
        <Stack.Screen name="ViewPend" component={ViewPend} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="VUDetails" component={VUDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;