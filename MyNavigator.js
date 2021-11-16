import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StaticADayPage from './screens/StaticInADayPage';
import CaloriesCalculatePage from './screens/CaloriesCalculatePage'
import ScheduleAndNotificationPage from './screens/ScheduleAndNotificationPage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

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

export default function MyNavigator() {
    return(
        <NavigationContainer>
            
        </NavigationContainer>
    )
}