import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,  TextInput} from 'react-native';

export default function StaticADayPage(){
    return(
        <View style={styles.container}>
            <View style={styles.textBox}>
                <Text>Age</Text>
                <TextInput style={styles.input} placeholder="Enter Your Age"></TextInput>
                <Text>Weight</Text>
                <TextInput style={styles.input} placeholder="Enter Your Weight"></TextInput>
                <Text>Height</Text>
                <TextInput style={styles.input} placeholder="Enter Your Height"></TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start'
    },
    textBox: {
        marginTop: "10%",
        marginLeft: "5%"
    },
    input: {
        borderWidth: 2,
        width: "65%"
    }
  });