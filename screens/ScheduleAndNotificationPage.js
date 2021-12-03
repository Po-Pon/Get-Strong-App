import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { date } from 'yup';
import axios from "axios";

export default function SchedulePage({route, navigation }){
  const [calorieNeed, setCalorieNeed] = useState(100)
  const [allDateSchedule, setAllDateSchedule] = useState([])

  async function get(){
    await axios.get("http://localhost:8888/api/" + route.params.params)
        .then((response) => {
          setAllDateSchedule(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

async function getCalNeed(){
  await axios.get("http://localhost:8888/api/users/" + route.params.params)
      .then((response) => {
        calNeed(response.data.age, response.data.weight, response.data.height, response.data.gender)
      })
      .catch((err) => {
          console.log(err)
      })
}


  useEffect(() => {
    get()
    getCalNeed()
  })

  const calNeed = (age, weight, height, sex) => {
      let BMR = 0

      if(sex == 1){
        BMR = 66 + (13.7*weight) + (5*height) - (6.8*age)
      }
      else if(sex == 2){
        BMR = 665 + (9.6*weight) + (1.8*height) - (4.7*age)
      }

      setCalorieNeed(Math.round((BMR*1.55)-BMR)/2)
  }

  const sumCal = (date) => {
    let result = 0
      for(let i = 0; i < allDateSchedule.length; i++){
          if(moment(allDateSchedule[i].date).format('MM/D/YYYY') == moment(date).format('MM/D/YYYY')){
              result += allDateSchedule[i].burn
          }
      }
    return result
  }

  const colorLevel = (calBurn, calNeed) => {
      if(0 <= calBurn/calNeed && calBurn/calNeed <= 0.25){
          return "#FF0000"
      }
      else if(0.25 <= calBurn/calNeed && calBurn/calNeed <= 0.5){
          return "#FFF300"
      }
      else if(0.5 <= calBurn/calNeed && calBurn/calNeed <= 0.75){
          return "#9acd32"
      }
      else if(0.75 <= calBurn/calNeed && calBurn/calNeed <= 1){
          return "#00FF21"
      }
      else if(1 <= calBurn/calNeed){
          return "#00FFFF"
      }
  }

  const customDatesStyles = [];
  for(let i=0; i < allDateSchedule.length; i++) {
    customDatesStyles.push({
      date: allDateSchedule[i].date,
      style: {backgroundColor: colorLevel(sumCal(allDateSchedule[i].date), calorieNeed)},
      textStyle: {color: 'black'},
      containerStyle: [],
      allowDisabled: true,
    });
  }

    return(
        <View style={styles.container}>
          <CalendarPicker 
          onDateChange={(date) => {
            let showDate = moment(date).format('MM/D/YYYY')
            let cal = sumCal(date)
            console.log(calorieNeed)
            if(cal == 0){
            navigation.navigate('Static A Day',
              {
                day: showDate,
                need: calorieNeed,
                burn: 0,
                ex: false
              })
            }
            else{
              navigation.navigate('Static A Day', 
              {
                day: showDate,
                need: calorieNeed,
                burn: cal,
                ex: true
              })
            }
          }}
          todayTextStyle={{fontWeight: 'bold'}}
          customDatesStyles={customDatesStyles}
          selectedDayStyle={{backgroundColor: 'grey'}}
          textStyle={{color: "#FFFFFF"}}
          ></CalendarPicker>
        <View style={styles.guide}>
            <View style={{width: 20, height: 20, backgroundColor: "#FF0000", marginRight: 20, borderRadius: 50}}></View>
            <Text style={{color: "white"}}>ออกกำลังกายเผาผลาญแคลลอรีได้ 1 - 25% ของเป้าหมาย</Text>
        </View>
        <View style={styles.guide}>
            <View style={{width: 20, height: 20, backgroundColor: "#FFF300", marginRight: 20, borderRadius: 50}}></View>
            <Text style={{color: "white"}}>ออกกำลังกายเผาผลาญแคลลอรีได้ 26 - 50% ของเป้าหมาย</Text>
        </View>
        <View style={styles.guide}>
            <View style={{width: 20, height: 20, backgroundColor: "#9acd32", marginRight: 20, borderRadius: 50}}></View>
            <Text style={{color: "white"}}>ออกกำลังกายเผาผลาญแคลลอรีได้ 51 - 75% ของเป้าหมาย</Text>
        </View>
        <View style={styles.guide}>
            <View style={{width: 20, height: 20, backgroundColor: "#00FF21", marginRight: 20, borderRadius: 50}}></View>
            <Text style={{color: "white"}}>ออกกำลังกายเผาผลาญแคลลอรีได้ 76 - 100% ของเป้าหมาย</Text>
        </View>
        <View style={styles.guide}>
            <View style={{width: 20, height: 20, backgroundColor: "#00FFFF", marginRight: 20, borderRadius: 50}}></View>
            <Text style={{color: "white"}}>ออกกำลังกายเผาผลาญแคลลอรีได้เกินกว่าเป้าหมาย</Text>
        </View>
        </View>
    )
}
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#064273',
      },
      selectdaySchedules: {
        marginTop: 50,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 4,
      },
      textDate: {
        textAlign: 'center', 
        fontSize: 24,
        backgroundColor: "#ff0e00"
      },
      textSchedule: {
        textAlign: 'left', 
        fontSize: 18, 
        marginTop: 5
      },
      button: {
        alignItems: "center",
        backgroundColor: "#ff0e00",
        padding: 10
      },
      guide: {
        marginTop: 20,
        flexDirection: "row",
        alignSelf: 'flex-start',
        marginLeft: "3%"
      }
    });