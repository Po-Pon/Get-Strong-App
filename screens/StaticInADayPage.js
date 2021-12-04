import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { processColor, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';
import CircularProgressBar from 'react-native-circular-progress-indicator'

export default function StaticADayPage({navigation, route}){
    const [timeNow, setTimeNow] = useState(new moment())
    const progress = route.params.burn/route.params.need
    const [schedules, setSchedules] = useState([
      {
        id: '1',
        mode: 'ABS BEGINNER',
        calBurn: 200
      },
      {
        id: '2',
        mode: 'ABS BEGINNER',
        calBurn: 200
      },
      {
        id: '3',
        mode: 'ABS BEGINNER',
        calBurn: 200
      },
      {
        id: '4',
        mode: 'ABS ADVANCED',
        calBurn: 330
      },
      {
        id: '5',
        mode: 'ABS Intermidiate',
        calBurn: 270
      },
    ])
    const [display, setDisplay] = useState([])
    

    const scheduleDisplay = () => {
      let result = []
      let have = [0]
      let j = 0
      for(let i = 0; i < schedules.length; i++){
        if(result.length == 0){
          result.push(schedules[i])
        }
        else{
          have[0] = 0
          for(j; j < result.length; j++){
            if(result[j].mode == schedules[i].mode){
              result[j].calBurn = result[j].calBurn + schedules[i].calBurn
              have[0] = 1
              console.log(have)
              break
            }
          }
          if(have[0] == 0){
            result.push(schedules[i])
          }
        }
      }
      return result
    }

    const refreshClock = () => {
        setTimeNow(new moment());
      }

    const clock = () => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
          clearInterval(timerId);
        };
    }
    
    
    const checkDate = () => {
      if(timeNow.format('MM/D/YYYY') === route.params.day){
        return(
          <View style={styles.time}>
            <Text style={styles.textTime}>{timeNow.format('LT')}</Text>
            <Text style={styles.textDate}>{timeNow.format('Do MMMM YYYY')}</Text>
          </View>
        )
      }
      else{
        return (
          <View style={styles.time}>
            <Text style={{fontSize: 24,}}>{moment(route.params.day).format('Do MMMM YYYY')}</Text>
          </View>
        )
      }
    }

    const checkProgress = () => {
        if(route.params.ex == true){
            return(
              <View style={styles.progress}>
              <Text style={{top: 10}}>GOAL Progress</Text>
              <View style={styles.progressBar}>
                <View style={progressValue}/></View>
              </View> 
            )
        }
    }

    const checkCalBurn = () => {
        if(route.params.ex == true){
            return(
            <View style={styles.caloriesResult}>
              <Text style={{fontSize: 24}}>Your caloriesBurn is : {route.params.burn} Kcal</Text>
            </View>
            )
        }
        else{
            return(
              <View style={styles.caloriesResult}>
                <Text style={{fontSize: 20}}>You don't have Exersice on this Day</Text>
              </View>
            )
        }
    }

    const scheduleList = ({item}) => {
      return(
        <View style={styles.exerciseList}>
          <Text>Exercise Mode : {item.mode}</Text>
          <Text>Calories Burn : {item.calBurn} Kcal</Text>
        </View>
      )
    }

    const checkSchedules = () => {
      if(route.params.ex == true){
        return(
          <View style={styles.schedules}>
            <Text style={{fontSize: 24, marginTop: 20, marginBottom: 20}}>Exercise In A Day</Text>
            <FlatList
              data={display}
              renderItem={scheduleList}
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
    }
    
    const progressColor = () => {
      if(progress == 0){
        return "gray"
      }
      else if(0 <= progress && progress <= 0.25){
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
      borderWidth: 0,
      height: '100%',
      backgroundColor: progressColor(),
      width: progressBar(),
      alignSelf: 'flex-start',
      borderRadius: 20
    }

      useEffect(() => {
        clock()
        setDisplay(scheduleDisplay())
      }, []);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          {checkDate()}
          {checkProgress()}
          {checkCalBurn()}
          {checkSchedules()}
          <TouchableOpacity onPress={() => {navigation.pop()}}
        ><View style={styles.backBtn}><Text style={{fontSize: 24}}>Back to Calendar</Text></View></TouchableOpacity>
        </ScrollView>
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#064273',
      justifyContent: 'flex-start',
    },
    scroll: {
      flex: 1,
    },
    time: {
      marginTop: 30,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#AAAAAA',
      borderRadius: 15,
      alignSelf: 'center'
    },
    textTime: {
      fontSize: 72,
    },
    textDate: {
      fontSize: 24,
    },
    progress: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: 100,
      alignItems: 'center',
      backgroundColor: '#AAAAAA',
      borderRadius: 20,
      alignSelf: 'center'
    },
    progressBar: {
      marginTop: 10,
      borderColor: 'black',
      borderWidth: 4,
      borderRadius: 20,
      width: '90%',
      height: 50,
      alignItems: 'center',
    },
    progressValue: {
      borderWidth: 1,
      height: '100%',
      backgroundColor: 'red',
      width: '100%',
      alignSelf: 'flex-start',
    },
    caloriesResult: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      height: 150,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#AAAAAA',
      borderRadius: 15,
      alignSelf:'center'
    },
    schedules: {
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 4,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#AAAAAA',
      borderRadius: 15,
      alignSelf:'center'
    },
    exerciseList: {
      marginTop: 10,
      marginBottom:10,
      borderColor: 'black',
      borderWidth: 4,
      borderRadius: 15,
      width: 340,
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EEEEEE'
    },
    backBtn: {
      marginTop: 20,
      marginBottom: 30,
      width: 380,
      height: 75,
      alignSelf: 'center',
      borderRadius: 15,
      borderWidth: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EEEEEE'
    }
  });
