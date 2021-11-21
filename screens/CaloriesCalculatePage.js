import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Picker, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaloriesCalculate(props){
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [manIcon, setManIcon] = useState("man-outline")
    const [womanIcon, setWomanIcon] = useState("woman-outline")
    const [dailyLife, setDailyLife] = useState("");
    const [calories, setCalories] = useState(0)
    const allDailyLife = [
        "ไม่ได้ออกกำลังกายเลย",
        "ออกกำลังกายอาทิตย์ละ 1-3 วัน",
        "ออกกำลังกายอาทิตย์ละ 3-5 วัน",
        "ออกกำลังกายอาทิตย์ละ 6-7 วัน",
        "ออกกำลังกายอย่างหนักทุกวันเช้าเย็น"
    ]
    const [ageAuth, setAgeAuth] = useState(false)
    const [sexAuth, setSexAuth] = useState(false)
    const [weightAuth, setWeightAuth] = useState(false)
    const [heightAuth, setHeightAuth] = useState(false)
    const [dailyAuth, setDailyAuth] = useState(false)
    const [checkInput, setCheckInput] = useState(false)

    useEffect(() => {
        setAgeAuth(age == "")
        setSexAuth(sex == "")
        setHeightAuth(height == "")
        setWeightAuth(weight == "")
        setDailyAuth(dailyLife == "")
    })

    const screenDailyBurn = (value) => {
        setDailyLife(value)
        let BMR = 0;
        if(sex == "man"){
            BMR = 66 + (13.7*weight) + (5*height) - (6.8*age)
        }
        else if(sex == "woman"){
            BMR = 665 + (9.6*weight) + (1.8*height) - (4.7*age)
        }

        if(value === "ไม่ได้ออกกำลังกายเลย"){
            setCalories(Math.round((BMR*1.2)-BMR)/2)
        }
        else if(value === "ออกกำลังกายอาทิตย์ละ 1-3 วัน"){
            setCalories(Math.round((BMR*1.375)-BMR)/2)
        }
        else if(value === "ออกกำลังกายอาทิตย์ละ 3-5 วัน"){
            setCalories(Math.round((BMR*1.55)-BMR)/2)
        }
        else if(value === "ออกกำลังกายอาทิตย์ละ 6-7 วัน"){
            setCalories(Math.round((BMR*1.725)-BMR)/2)
        }
        else if(value === "ออกกำลังกายอย่างหนักทุกวันเช้าเย็น"){
            setCalories(Math.round((BMR*1.9)-BMR)/2)
        }
    }

    const showResult = () => {
        setCheckInput(true)
        if(!ageAuth && !sexAuth && !weightAuth && !heightAuth && !dailyAuth){
            setCheckInput(false)
            props.navigation.navigate('Result', {Cal: calories, sex: sex})
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
                <Text style={{marginRight: 25, fontSize: 20, color: 'white'}}>Age</Text>
                <TextInput style={styles.input} value={age} keyboardType="number-pad" maxLength={3} onChangeText={(text) => {setAge(text)}}/>
                <TouchableOpacity style={{marginLeft: 50, marginRight: 2}}>
                    <Ionicons onPress={() => {selectSex("man")}} name={manIcon} size={50} color="white" />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                <TouchableOpacity style={{marginleft: 2}}>
                    <Ionicons onPress={() => {selectSex("woman")}} name={womanIcon} size={50} color="white" />
                </TouchableOpacity>
                
            </View>
            {ageAuth && checkInput && <Text style={styles.auth}>Please Key your Age in field</Text>}
            {sexAuth && checkInput && <Text style={styles.auth}>Please Select Your Gender</Text>}
            <View style={styles.textBox}>
                <Text style={{marginRight: 10, fontSize: 20, color: 'white'}}>Weight</Text>
                <TextInput style={styles.input} keyboardType="number-pad" value={weight} maxLength={3} onChangeText={text => setWeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20, color: 'white'}}>KG</Text>
            </View>
            {weightAuth && checkInput && <Text style={styles.auth}>Please Key your Weight in field</Text>}
            <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20, color: 'white'}}>Height</Text>
                <TextInput style={styles.input} keyboardType="number-pad" value={height} maxLength={3} onChangeText={text => setHeight(text)} />
                <Text style={{marginLeft: 10, fontSize: 20, color: 'white'}}>CM</Text>
            </View>
            {heightAuth && checkInput && <Text style={styles.auth}>Please Key your Height in field</Text>}
             <View style={styles.textBox}>
                <Text style={{marginRight: 15, fontSize: 20, color: 'white'}}>Daily Life</Text>
                <View style={{borderColor: 'black', borderWidth: 4, backgroundColor: 'white', borderRadius: 15}}>
                    <Picker
                        selectedValue={dailyLife}
                        style={styles.select}
                        onValueChange={(itemValue, itemIndex) => {
                            screenDailyBurn(itemValue)
                        }}
                    >
                    <Picker.Item label="Select Your Daily Life" value="" key="-1"/>
                    {allDailyLife.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index + 1}/>
                    })}
                    </Picker>
                </View>
            </View>
            {dailyAuth && checkInput && <Text style={styles.auth}>Please Select Your Daily Life</Text>}
            <TouchableOpacity onPress={showResult}
            ><View style={styles.confirmBtn}><Text>Confirm</Text></View></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#064273',
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
        fontSize: 20,
        borderColor: "black",
        backgroundColor: 'white',
        borderRadius: 15
    },
    verticalLine: {
        height: "100%",
        width: 4,
        backgroundColor: 'white'
    },
    select: {
        width: 250,
        height: 45,
        borderWidth: 4,
        backgroundColor: 'white',
    },
    guides: {
      marginTop: 50,
      borderColor: 'black',
      backgroundColor: 'white',
      borderWidth: 4,
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
    },
    confirmBtn: {
        backgroundColor: 'red',
        marginTop: 50,
        width: 300,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'aqua',
        borderRadius: 15
    }
  });