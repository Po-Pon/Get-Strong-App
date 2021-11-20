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

const Drawer = createDrawerNavigator();

const DrawerMenu = createDrawerNavigator();

function ScheduleProgress(){
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#ff0000',}}}>
            <Stack.Screen name="Your Schedule" component={ScheduleAndNotificationPage}></Stack.Screen>
            <Stack.Screen name="Static A Day" component={StaticADayPage}></Stack.Screen>
        </Stack.Navigator>
    )
}

function ExerciseDrawerMenu(){
    return(
        <DrawerMenu.Navigator screenOptions={{headerStyle: {backgroundColor: '#ff0000',}}}>
            <DrawerMenu.Screen name="Calorie Calculator" component={CaloriesCalculatePage}></DrawerMenu.Screen>
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

function MainNavigator() {
    return(
      <Stack.Navigator initialRoutename="first"
        screenOptions = {{
          headerShown: false,
        }}
      >
        <Stack.Screen name="first" component={FirstPage}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="calculatePage" component={ExerciseDrawerMenu}
            options={{
                headerShown: false,
            }}
        />
      </Stack.Navigator>
    );
  }


export default function MyNavigator() {
    return(
        <NavigationContainer>
            <MainNavigator/>
        </NavigationContainer>
    )
}