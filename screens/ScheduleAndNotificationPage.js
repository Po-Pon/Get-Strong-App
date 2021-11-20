import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export default function SchedulePage({ navigation }){
  const [selectDate, setSelectDate] = useState("")
  const [caloriesNeed, setCaloriesNeed] = useState(870)
  const [caloriesBurn, setCaloriesBurn] = useState(870)

    return(
        <View style={styles.container}>
          <ScrollView>
          <CalendarPicker 
          onDateChange={(date) => {
            let newDate = date.toDate()
            let showDate = format(newDate, "MMMM dd, yyyy")
            setSelectDate(showDate)
          }}
          todayBackgroundColor="yellow"
          ></CalendarPicker>
          {selectDate != "" &&
          <View pointerEvents="auto" style={styles.selectdaySchedules}>
            <Text style={styles.textDate}>{selectDate}</Text>
            <Text style={styles.textSchedule}>Your Schedules</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {navigation.navigate('Static A Day', 
              {
                day: selectDate,
                need: caloriesNeed,
                burn: caloriesBurn
              })}}
            >
            <Text>Watch Your Static</Text>
            </TouchableOpacity>
          </View>
          }
          </ScrollView>
        </View>
    )
}
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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