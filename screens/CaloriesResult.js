import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Picker, ScrollView, Image, ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaloriesResult({navigation, route}){

    const changePic = () => {
        if(route.params.sex == "man"){
            return <ImageBackground style={styles.img} source={require('../assets/CaloriesLevel/boyWalk.png')}></ImageBackground>
        }
        else if(route.params.sex == "woman"){
            return <ImageBackground style={styles.img} source={require('../assets/CaloriesLevel/girlWalk.png')}></ImageBackground>
        }
    }

    return(
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Topic}>Your Result</Text>
        {changePic()}
        <Text style={styles.static}>Recommended Daily Intake Result</Text>
        <Text style={styles.Topic}>{route.params.Cal} Kcal</Text>
        <TouchableOpacity onPress={() => {navigation.pop()}}
        ><View style={styles.confirmBtn}><Text>Back to Calories Calculator</Text></View></TouchableOpacity>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#064273',
        justifyContent: 'center'
    },
    Topic: {
        fontSize: 32,
        paddingTop: 50,
        color: 'white',
    },
    img: {
        width: "100%",
        height: 850,
        marginTop: 50,
        borderRadius: 10
    },
    confirmBtn: {
        backgroundColor: 'red',
        marginTop: 30,
        marginBottom: 30,
        width: 300,
        height: 50,
        alignSelf: 'center',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'aqua'
    },static: {
        fontSize: 20,
        marginTop: 30,
        color: 'white',
    }
})