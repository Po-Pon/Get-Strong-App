import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

export default function StaticADayPage(){
    const [timeNow, setTimeNow] = useState(new moment())
    const [calories, setCalories] = useState(0)
    const [dayProgress, setDayProgress] = useState(0.1)

    const refreshClock = () => {
        setTimeNow(new moment());
      }
    
    const progressValue = {
      borderColor: 'red',
      borderWidth: 1,
      height: '100%',
      backgroundColor: 'red',
      width: dayProgress*100 + "%",
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
        <View style={styles.time}>
            <Text style={styles.textTime}>{timeNow.format('LT')}</Text>
            <Text style={styles.textDate}>{timeNow.format('MM/D/YYYY')}</Text>
        </View>
        <View style={styles.calender}>

        </View>
        <View style={styles.progress}>
            <Text style={{top: 5}}>เป้าหมายของวันนี้</Text>
            <View style={styles.progressBar}>
              <View style={progressValue}/>
            </View>
        </View> 
        <View style={styles.compare}></View>
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
      alignItems: 'center'
    },
    textTime: {
      fontSize: 72,
    },
    textDate: {
      fontSize: 24,
      alignSelf: 'flex-end',
      top: 30
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
      marginTop: 5,
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
    compare: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: '20%',
      alignItems: 'center'
    }
  });