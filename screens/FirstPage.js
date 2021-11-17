import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native";

const firstPage = (props) => {
    return(
        <View style={styles.firstPage}>
            <Text style={styles.headerText}>Get Strong</Text>
            <Image style={styles.logo} source={require('../assets/picture/logo.png')} />
            <TouchableOpacity style={styles.button}
                onPress = {() => {
                    props.navigation.navigate('login')
                }}
            >
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress = {() => {
                    props.navigation.navigate('register')
                }}
            >
                <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    firstPage:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#064273"
    },
    headerText:{
        color: "#fff",
        fontSize: 30,
        marginTop: 50
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 50,
    },
    button:{
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        height: 80,
        fontSize: 20,
        color: "#fff",
        borderRadius: 10,
        backgroundColor: "#1da2d8",
        marginTop: 50
    },
    textButton:{
        fontSize: 20,
        color: "#fff",
    }
})

export default firstPage;