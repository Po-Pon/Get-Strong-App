import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { processColor, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

export default function StaticADayPage({route}){
    const [timeNow, setTimeNow] = useState(new moment())
    const progress = route.params.burn/route.params.need

    const refreshClock = () => {
        setTimeNow(new moment());
      }
    
    const checkDate = () => {
      if(timeNow.format('MM/D/YYYY') === route.params.day){
        return(
          <View style={styles.time}>
            <Text style={styles.textTime}>{timeNow.format('LT')}</Text>
            <Text style={styles.textDate}>{timeNow.format('MM/D/YYYY')}</Text>
          </View>
        )
      }
      else{
        return (
          <View style={styles.time}>
            <Text style={{fontSize: 64,}}>{route.params.day}</Text>
          </View>
        )
      }
    }
    
    const progressColor = () => {
      if(0 <= progress && progress <= 0.25){
        return "#FF0000"
      }
      else if(0.25 <= progress && progress <= 0.5){
        return "#FFF300"
      }
      else if(0.5 <= progress && progress <= 0.75){
        return "#9acd32"
      }
      else if(0.75 <= progress && progress <= 1){
        return "#00FF21"
      }
      else if(1 <= progress){
        return "aqua"
      }
    }

    const progressBar = () => {
      if(progress >= 1){
        return "100%"
      }
      else{
        return progress*100 + "%"
      }
    }
    
    const progressValue = {
      borderColor: 'red',
      borderWidth: 1,
      height: '100%',
      backgroundColor: progressColor(),
      width: progressBar(),
      alignSelf: 'flex-start'
    }

      useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
          };
      }, []);

    return (
      <View style={styles.container}>
        {checkDate()}
        <View style={styles.progress}>
            <Text style={{top: 5}}>GOAL Progress</Text>
            <View style={styles.progressBar}>
              <View style={progressValue}/>
            </View>
        </View> 
        <View style={styles.caloriesResult}>
            <Text style={{fontSize: 24}}>Your caloriesBurn is : {route.params.burn} Kcal</Text>
        </View>
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    time: {
      marginTop: 30,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '30%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textTime: {
      fontSize: 72,
    },
    textDate: {
      fontSize: 24,
    },
    calender: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '15%',
      alignItems: 'center'
    },
    progress: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '15%',
      alignItems: 'center'
    },
    progressBar: {
      marginTop: 10,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '50%',
      alignItems: 'center'
    },
    progressValue: {
      borderColor: 'red',
      borderWidth: 1,
      height: '100%',
      backgroundColor: 'red',
      width: '100%',
      alignSelf: 'flex-start'
    },
    caloriesResult: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '20%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  });