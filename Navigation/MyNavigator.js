import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import loginPage from "../screens/LoginPage";
import registerPage from "../screens/RegisterPage";
import { style } from "dom-helpers";

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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <ImageBackground 
            source={{uri: 'https://i.pcmag.com/imagery/roundups/00Y8IEhbyfbSoBDSHtmL7CB-1.fit_lim.size_850x490.v1601322181.jpg'}}
            style={{ width: "100%", height: 180}}
        />
        <View style={styles.container}>
          <Text style={styles.textHeader}>Get Strong</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <DrawerItem 
            icon={() => (
              <Icon 
              name="exit-to-app" 
              color="red"
              size={20}
              />
            )}
            label={() => <Text style={{ color: '#900', fontWeight:'bold' }}>Sign Out</Text>}
            onPress={() => {props.navigation.popToTop()}}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function ExerciseDrawerMenu({route}) {
  return (
    <DrawerMenu.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerStyle: { backgroundColor: "#3776D4"}, headerTintColor:'#fff' }}
    >
      <DrawerMenu.Screen
        name="WORKOUT"
        initialParams={{ params: route.params.userId }}
        component={SelectExerciseMode}
        options={{
          title: 'WORKOUT',
          drawerIcon: ({focused, size}) => (
             <Icon
                name="home-variant-outline"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
             />
          ),
        }}
      ></DrawerMenu.Screen>
      <DrawerMenu.Screen
        name="Calorie Calculator"
        initialParams={{params: route.params.userId}}
        component={CaloriesCal}
        options={{
          title: 'Calorie Calculator',
          drawerIcon: ({focused, size}) => (
             <Icon
                name="human-male-height"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
             />
          ),
        }}
      ></DrawerMenu.Screen>
      <DrawerMenu.Screen
        name="Your Static Calender"
        options={{ color: '#fff'}}
        initialParams={{ params: route.params.userId }}
        component={ScheduleAndNotificationPage}
        options={{
          title: 'Your Static Calender',
          drawerIcon: ({focused, size}) => (
             <Icon
                name="calendar-multiselect"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
             />
          ),
        }}
      ></DrawerMenu.Screen>
    </DrawerMenu.Navigator>
  );
}

function CaloriesCal(){
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#064273'}, headerTitleStyle: {color : 'white'}}}>
            <Stack.Screen name="Calorie Calculate" component={CaloriesCalculatePage}></Stack.Screen>
            <Stack.Screen name="Result" component={CaloriesResult} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
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
            <Stack.Screen name="firstPage" component={firstPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="login" component={LoginPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="register" component={RegisterPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="FeaturePage" component={ExerciseDrawerMenu}
                options={
                  ({ route }) => ({
                      headerShown: false,
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
            <Stack.Screen name="Static A Day" component={StaticADayPage}
              options={
                ({ route }) => ({
                    title: "Static A Day",
                    headerShown: true,
                })
              }
            ></Stack.Screen>
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


const styles = StyleSheet.create({
  container:{
    flex: 1,
    position: 'absolute',
    bottom: 10,
    marginLeft: 30
  },
  textHeader:{
    fontWeight: "bold",
    color: '#fff',
    fontSize: 20,
  },
  bottomDrawerSection: {
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 2,
  },
})