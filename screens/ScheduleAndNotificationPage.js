import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { date } from 'yup';

export default function SchedulePage({ navigation }){
  const [calorieNeed, setCalorieNeed] = useState(500)
  const [allDateSchedule, setAllDateSchedule] = useState([
    {"date": "11/16/2021", "burn": 100},
    {"date": "11/17/2021", "burn": 200},
    {"date": "11/18/2021", "burn": 300},
    {"date": "11/19/2021", "burn": 480},
    {"date": "11/20/2021", "burn": 580},
  ])

  const searchCal = (date) => {
      for(let i = 0; i < allDateSchedule.length; i++){
          if(moment(allDateSchedule[i].date).format('MM/D/YYYY') == moment(date).format('MM/D/YYYY')){
              return allDateSchedule[i].burn
          }
      }
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
      style: {backgroundColor: colorLevel(allDateSchedule[i].burn, calorieNeed)},
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
            let cal = searchCal(date)
            if(typeof(cal) == "undefined"){
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
        alignItems: 'center'
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