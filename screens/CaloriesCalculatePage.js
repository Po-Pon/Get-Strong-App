import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StaticADayPage(){
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [manIcon, setManIcon] = useState("man-outline")
    const [womanIcon, setWomanIcon] = useState("woman-outline")
    const [allSelectedValue, setAllSelectedValue] = useState(["exercise 1", "exercise 2", "exercise 3", "exercise 4", "exercise 5"])
    const [selectedValue, setSelectedValue] = useState("");
 

    const selectSex = (select) => {
        if(select === "man"){
            setSex("man")
            setManIcon("man")
            setWomanIcon("woman-outline")
        }
        else if(select === "woman"){
            setSex("woman")
            setManIcon("man-outline")
            setWomanIcon("woman")
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.textBox}>
                <Text style={{marginRight: 25, fontSize: 20}}>Age</Text>
                <TextInput style={styles.input} keyboardType="number-pad" maxLength={3} onChangeText={text => setAge(text)}/>
                <TouchableOpacity onPress={() => {selectSex("man")}} style={{marginLeft: 50, marginRight: 2}}>
                    <Ionicons name={manIcon} size={50} color="black" />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                <TouchableOpacity style={{marginleft: 2}}>
                    <Ionicons onPress={() => {selectSex("woman")}} name={womanIcon} size={50} color="black" />
                </TouchableOpacity>
                
            </View>
            <View style={styles.textBox}>
                <Text style={{marginRight: 10, fontSize: 20}}>Weight</Text>
                <TextInput style={styles.input} keyboardType="number-pad" maxLength={3} onChangeText={text => setWeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20}}>KG</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20}}>Height</Text>
                <TextInput style={styles.input} keyboardType="number-pad" maxLength={3} onChangeText={text => setHeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20}}>CM</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20}}>Activity</Text>
                <View style={{borderColor: 'black', borderWidth: 4}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.select}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                    <Picker.Item label="Select Exercise" value="" key="0"/>
                    {allSelectedValue.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index + 1}/>
                    })}
                    </Picker>
                </View>
            </View>
            {selectedValue != "" &&
            <View style={styles.guides}>
                <Text>{selectedValue}</Text>
            </View>
            }
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
        marginLeft: "5%",
        flexDirection: 'row',
    },
    input: {
        borderWidth: 4,
        width: 100,
        height: 50,
        textAlign: 'center',
        fontSize: 20
    },
    verticalLine: {
        height: "100%",
        width: 4,
        backgroundColor: 'black'
    },
    select: {
        width: 150,
        height: 45,
        borderWidth: 4,
        borderColor: 'black'
    },
    guides: {
      marginTop: 50,
      borderColor: 'black',
      borderTopWidth: 4,
      borderBottomWidth: 4,
      width: '90%',
      height: '20%',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  });