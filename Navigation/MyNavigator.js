import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// import screens
import StaticADayPage from '../screens/StaticInADayPage';
import CaloriesCalculatePage from '../screens/CaloriesCalculatePage';
import ScheduleAndNotificationPage from '../screens/ScheduleAndNotificationPage';
import firstPage from '../screens/FirstPage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator(); 

const DrawerMenu = createDrawerNavigator();

function ExerciseDrawerMenu(){
    return(
        <DrawerMenu.Navigator>
            <DrawerMenu.Screen name="Static Today" component={StaticADayPage}></DrawerMenu.Screen>
            <DrawerMenu.Screen name="Calories CalCulate" component={CaloriesCalculatePage}></DrawerMenu.Screen>
            <DrawerMenu.Screen name="Schedule" component={ScheduleAndNotificationPage}></DrawerMenu.Screen>
        </DrawerMenu.Navigator>
    )
}

function FirstPage(){
    return(
        <Stack.Navigator initialRoutename="firstPage"
            ScreenOptions={{
                headerStyle: {backgroundColor: "gray"},
                headerTintColor: "white",
            }}
        >
            <Stack.Screen name="firstPage" component={firstPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="login" component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="register" component={RegisterPage}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default function MyNavigator() {
    return(
        <NavigationContainer>
            <FirstPage/>
        </NavigationContainer>
    )
}