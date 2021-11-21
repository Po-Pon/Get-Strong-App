import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import axios from "axios";

const SelectExerciseMode = (props) =>{

    const onPress = (namepage, level) =>{
        axios.get(`http://localhost:8888/api/mode/${level}`)
        .then((response) => {
            props.navigation.navigate('ExerciseMode', {namepage: namepage, data: response.data})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text style={styles.textHeader}>EXERCISE MODE</Text>
                <MaterialCommunityIcons style={{marginLeft: 10, marginTop: 2}} name='arm-flex' size={30} color='#fff'/>
            </View>
            <TouchableOpacity style={styles.box1}
                onPress={() => {onPress('BEGINNER', 1)}}
            >
                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <Text style={styles.text1}>Beginner</Text>
                    <Image style={styles.pic1} source={require('../assets/picture/1.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box2}
                onPress={() => {onPress('INTERMEDIATE', 2)}}
            >
                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <Image style={styles.pic2} source={require('../assets/picture/2.png')} />
                    <Text style={styles.text2}>Intermediate</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box3}
                onPress={() => {onPress('ADVANCED', 3)}}
            >
                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <Text style={styles.text3}>Advanced</Text>
                    <Image style={styles.pic3} source={require('../assets/picture/3.png')} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#064273'
    },
    textHeader:{
        color: '#fff',
        fontSize: 25,
        fontFamily: 'system-ui',
        textShadowColor: 'blue',
        textShadowOffset: {width: 2, height: 2}
    },
    pic1: {
        width: 100,
        height: 120,
    },
    pic2: {
        width: 100,
        height: 130,
        marginLeft: 10
    },
    pic3: {
        width: 180,
        height: 200,
        marginRight: -40
    },
    text1:{
        color: '#fff',
        fontSize: 30,
        margin: 20
    },
    text2:{
        color: '#fff',
        fontSize: 30,
        margin: 12
    },
    text3:{
        color: '#fff',
        fontSize: 30,
        marginTop: 50
    },
    box1:{
        width: 320,
        height: 160,
        justifyContent:'center',
        alignItems: 'flex-end',
        backgroundColor: '#8A8AFF',
        marginTop: 20,
        borderRadius: 20,
    },
    box2:{
        width: 320,
        height: 160,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#FFC55C',
        marginTop: 20,
        borderRadius: 20,
    },
    box3:{
        width: 320,
        height: 160,
        justifyContent:'center',
        alignItems: 'flex-end',
        backgroundColor: '#FF5C5C',
        marginTop: 20,
        borderRadius: 20,
    },
})

export default SelectExerciseMode;

