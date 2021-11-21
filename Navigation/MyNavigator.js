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
import CaloriesResult  from '../screens/CaloriesResult'


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator(); 

const DrawerMenu = createDrawerNavigator();

function ScheduleProgress(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#064273'}, 
            headerTitleStyle: {color : 'white'}}}>
            <Stack.Screen name="Your Schedule" component={ScheduleAndNotificationPage}></Stack.Screen>
            <Stack.Screen name="Static A Day" component={StaticADayPage}></Stack.Screen>
        </Stack.Navigator>
    )
}

function CaloriesCal(){
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#064273'}, headerTitleStyle: {color : 'white'}}}>
            <Stack.Screen name="Calorie Calculate" component={CaloriesCalculatePage}></Stack.Screen>
            <Stack.Screen name="Result" component={CaloriesResult} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}

function ExerciseDrawerMenu(){
    return(
        <DrawerMenu.Navigator screenOptions={{headerStyle: {backgroundColor: '#064273'}, headerTitleStyle: {color : 'white'}}}>
            <DrawerMenu.Screen name="Calorie Calculator" component={CaloriesCal} options={{headerShown: false}}></DrawerMenu.Screen>
            <DrawerMenu.Screen name="Your Schedule" component={ScheduleProgress} options={{headerShown: false}}></DrawerMenu.Screen>
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
            <ExerciseDrawerMenu/>
        </NavigationContainer>
    )
}