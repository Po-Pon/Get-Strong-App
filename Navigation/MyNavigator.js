import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// import screens
import StaticADayPage from '../screens/StaticInADayPage';
import CaloriesCalculatePage from '../screens/CaloriesCalculatePage';
import ScheduleAndNotificationPage from '../screens/ScheduleAndNotificationPage';
import firstPage from '../screens/FirstPage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import ExerciseMode from '../screens/ExerciseMode';
import SelectExerciseMode from '../screens/SelectExerciseModePage';
import listOfExercisePage from "../screens/ListOfExercisePage";
import ExercisePage from '../screens/ExercisePage';
import CaloriesResult  from '../screens/CaloriesResult'

// Icons
import Ionicons from "react-native-vector-icons";
import { color } from "react-native-reanimated";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const DrawerMenu = createDrawerNavigator();

function FirstPage() {
    return (
      <Stack.Navigator
        initialRoutename="firstPage"
        ScreenOptions={{
          headerStyle: { backgroundColor: "gray" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="firstPage"
          component={firstPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }  

function ScheduleProgress() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#ff0000" } }}
    >
      <Stack.Screen
        name="Your Schedule"
        component={ScheduleAndNotificationPage}
      ></Stack.Screen>
      <Stack.Screen
        name="Static Today"
        component={StaticADayPage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function ExerciseDrawerMenu({route}) {
  return (
    <DrawerMenu.Navigator initialRouteName={SelectExerciseMode}
      screenOptions={{ headerStyle: { backgroundColor: "#3776D4"}, headerTintColor:'#fff' }}
    >
      <DrawerMenu.Screen
        name="WORKOUT"
        initialParams={{ params: route.params.userId }}
        component={SelectExerciseMode}
        options={{ title: 'WORKOUT', color: '#fff'}}
      ></DrawerMenu.Screen>
      <DrawerMenu.Screen
        name="Calorie Calculator"
        component={CaloriesCalculatePage}
      ></DrawerMenu.Screen>
      <DrawerMenu.Screen
        name="Your Schedule"
        component={ScheduleProgress}
        options={{ headerShown: false }}
      ></DrawerMenu.Screen>
    </DrawerMenu.Navigator>
  );
function ScheduleProgress(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#064273'}, 
            headerTitleStyle: {color : 'white'}}}>
            <Stack.Screen name="Your Schedule" component={ScheduleAndNotificationPage} options={{headerTitle: "Your Static Report"}}></Stack.Screen>
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
            <DrawerMenu.Screen name="Your Static Report" component={ScheduleProgress} options={{headerShown: false}}></DrawerMenu.Screen>
        </DrawerMenu.Navigator>
    )
}

function MainNavigator() {
    return(
        <Stack.Navigator initialRoutename="first"
            screenOptions = {{
                headerStyle: { backgroundColor: "#3776D4"}, 
                headerTintColor:'#fff',
                headerShown: false,
            }}
            >
            <Stack.Screen name="first" component={FirstPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="FeaturePage" component={ExerciseDrawerMenu}
                options={
                  ({ route }) => ({
                      title: route.params.userId,
                      headerShown: true,
                  })
              }
            />
            <Stack.Screen name="ExerciseMode" component={ExerciseMode}
                options={
                    ({ route }) => ({
                        title: route.params.namepage,
                        headerShown: true,
                    })
                }
            />
            <Stack.Screen name="listOfExercisePage" component={listOfExercisePage}
               options={
                    ({ route }) => ({
                        title: route.params.namepage,
                        headerShown: true,
                    })
                }
            />
            <Stack.Screen name="ExercisePage" component={ExercisePage}
               options={
                    ({ route }) => ({
                        title: "Exercise",
                        headerShown: true,
                    })
                }
            />
        </Stack.Navigator>
    );
}


export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
