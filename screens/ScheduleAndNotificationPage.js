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
  const [allDateSchedule, setAllDateSchedule] = useState([
    {"date": "11/16/2021", "need": 570, "burn": 100},
    {"date": "11/17/2021", "need": 570, "burn": 200},
    {"date": "11/18/2021", "need": 570, "burn": 300},
    {"date": "11/19/2021", "need": 570, "burn": 480},
    {"date": "11/20/2021", "need": 570, "burn": 580},
  ])

  const searchCal = (date) => {
      for(let i = 0; i < allDateSchedule.length; i++){
          if(moment(allDateSchedule[i].date).format('MM/D/YYYY') == moment(date).format('MM/D/YYYY')){
              return [allDateSchedule[i].burn, allDateSchedule[i].need]
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
          return "aqua"
      }
  }

  let customDatesStyles = [];
  for(let i=0; i < allDateSchedule.length; i++) {
    customDatesStyles.push({
      date: allDateSchedule[i].date,
      style: {backgroundColor: colorLevel(allDateSchedule[i].burn, allDateSchedule[i].need)},
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
                need: 1,
                burn: 0,
                ex: false
              })
            }
            else{
              navigation.navigate('Static A Day', 
              {
                day: showDate,
                need: cal[1],
                burn: cal[0],
                ex: true
              })
            }
          }}
          todayTextStyle={{fontWeight: 'bold'}}
          customDatesStyles={customDatesStyles}
          selectedDayStyle={{backgroundColor: 'grey'}}
          textStyle={{color: "#FFFFFF"}}
          ></CalendarPicker>
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
      }
    });