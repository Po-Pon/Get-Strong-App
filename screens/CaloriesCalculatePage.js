import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Picker, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StaticADayPage({route}){
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [manIcon, setManIcon] = useState("man-outline")
    const [womanIcon, setWomanIcon] = useState("woman-outline")
    const [dailyLife, setDailyLife] = useState("");
    const [calories, setCalories] = useState(0)
    const allDailyLife = [
        "นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย",
        "ออกกำลังกายหรือเล่นกีฬาเล็กน้อย ประมาณอาทิตย์ละ 1-3 วัน",
        "ออกกำลังกายหรือเล่นกีฬาปานกลาง ประมาณอาทิตย์ละ 3-5 วัน",
        "ออกกำลังกายหรือเล่นกีฬาอย่างหนัก ประมาณอาทิตย์ละ 6-7 วัน",
        "ออกกำลังกายหรือเล่นกีฬาอย่างหนักทุกวันเช้าเย็น"
    ]
    const [ageAuth, setAgeAuth] = useState("")
    const [sexAuth, setSexAuth] = useState("")
    const [weightAuth, setWeightAuth] = useState("")
    const [heightAuth, setHeightAuth] = useState("")
    const [dailyAuth, setDailyAuth] = useState("")

    useEffect(() => {
        setAgeAuth(age == "")
        setSexAuth(sex == "")
        setHeightAuth(height == "")
        setWeightAuth(weight == "")
    })

    const screenDailyBurn = (value) => {

        let BMR = 0;
        if(sex == "man"){
            BMR = 66 + (13.7*weight) + (5*height) - (6.8*age)
        }
        else if(sex == "woman"){
            BMR = 665 + (9.6*weight) + (1.8*height) - (4.7*age)
        }

        if(value === "นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย"){
            setCalories(Math.round((BMR*1.2)-BMR)/2)
        }
        else if(value === "ออกกำลังกายหรือเล่นกีฬาเล็กน้อย ประมาณอาทิตย์ละ 1-3 วัน"){
            setCalories(Math.round((BMR*1.375)-BMR)/2)
        }
        else if(value === "ออกกำลังกายหรือเล่นกีฬาปานกลาง ประมาณอาทิตย์ละ 3-5 วัน"){
            setCalories(Math.round((BMR*1.55)-BMR)/2)
        }
        else if(value === "ออกกำลังกายหรือเล่นกีฬาอย่างหนัก ประมาณอาทิตย์ละ 6-7 วัน"){
            setCalories(Math.round((BMR*1.725)-BMR)/2)
        }
        else if(value === "ออกกำลังกายหรือเล่นกีฬาอย่างหนักทุกวันเช้าเย็น"){
            setCalories(Math.round((BMR*1.9)-BMR)/2)
        }
    }

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
                <TextInput style={styles.input} value={age} keyboardType="number-pad" maxLength={3} onChangeText={(text) => {setAge(text)}}/>
                <TouchableOpacity onPress={() => {selectSex("man")}} style={{marginLeft: 50, marginRight: 2}}>
                    <Ionicons name={manIcon} size={50} color="black" />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                <TouchableOpacity style={{marginleft: 2}}>
                    <Ionicons onPress={() => {selectSex("woman")}} name={womanIcon} size={50} color="black" />
                </TouchableOpacity>
                
            </View>
            {ageAuth == true && <Text style={styles.auth}>Please Key your Age in field</Text>}
            {sexAuth == true &&<Text style={styles.auth}>Please Select Your Gender</Text>}
            <View style={styles.textBox}>
                <Text style={{marginRight: 10, fontSize: 20}}>Weight</Text>
                <TextInput style={styles.input} keyboardType="number-pad" value={weight} maxLength={3} onChangeText={text => setWeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20}}>KG</Text>
            </View>
            {weightAuth == true && <Text style={styles.auth}>Please Key your Weight in field</Text>}
            <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20}}>Height</Text>
                <TextInput style={styles.input} keyboardType="number-pad" value={height} maxLength={3} onChangeText={text => setHeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20}}>CM</Text>
            </View>
            {heightAuth == true &&<Text style={styles.auth}>Please Key your Height in field</Text>}
             <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20}}>Daily Life</Text>
                <View style={{borderColor: 'black', borderWidth: 4}}>
                    <Picker
                        selectedValue={dailyLife}
                        style={styles.select}
                        onValueChange={(itemValue, itemIndex) => {
                            screenDailyBurn(itemValue)
                        }}
                    >
                    <Picker.Item label="Select Daily Life" value="" key="0"/>
                    {allDailyLife.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index + 1}/>
                    })}
                    </Picker>
                </View>
            </View>
            {dailyAuth == true && <Text style={styles.auth}>Please Select Your Daily Life</Text>}
            {calories != 0 &&
            <View style={styles.guides}>
                <Text>Recommended Daily Intake Result</Text>
                <Text>{calories} KCAL</Text>
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
        width: 200,
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
    },
    auth: {
        color: 'red',
        marginLeft: "5%"
    }
  });