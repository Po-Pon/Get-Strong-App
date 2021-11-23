import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Dumbbell = (props) =>{
  if(props.level == 1){
    return(
      <View>
        <Icon name="dumbbell" color="#fff" size={30} />
      </View>
    );
  }
  else if(props.level == 2){
    return(
      <View style={{flexDirection: 'row'}}>
        <Icon name="dumbbell" color="#fff" size={30} />
        <Icon name="dumbbell" color="#fff" size={30} />
      </View>
    );
  }
  else if(props.level == 3){
    return(
      <View style={{flexDirection: 'row'}}>
        <Icon name="dumbbell" color="#fff" size={30} />
        <Icon name="dumbbell" color="#fff" size={30} />
        <Icon name="dumbbell" color="#fff" size={30} />
      </View>
    );
  }
}

const ExerciseImage = (props) => (
  <>
    <View style={{borderRadius: 20 }}>
      <ImageBackground
        source={{
          uri: props.image,
        }}
        style={{ width: "100%", height: 180}}
        imageStyle={{ borderRadius: 20}}
      >
        <View style={{backgroundColor: "rgba(0, 0, 0, 0.35)", flex: 1,borderRadius: 20}}></View>
      </ImageBackground>
    </View>
    <View
      style={{
        position: "absolute",
        left: 15,
        bottom: 10,
      }}
    >
      <Text
        style={{
          color: "#fff",
          marginBottom: 95,
          fontWeight: "bold",
          fontSize: 20,
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        }}
      >
        {props.name}
      </Text>
      <Dumbbell level={props.level}/>
    </View>
  </>
);

const ExerciseMode = (props) => {

  const userId = props.route.params.userId;
  console.log(userId)
  const exerciseModes = props.route.params.data;
  console.log(exerciseModes)

  const onPress = (index) => {
    props.navigation.navigate('listOfExercisePage', {
      data: exerciseModes[index].list, namepage: exerciseModes[index].name, 
      cal: exerciseModes[index].cal, duration: exerciseModes[index].duration,
      userId: userId
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 15 }}>
        <View>
          {/* <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10,
            }}
          >
            BEGINNER
          </Text> */}
          {exerciseModes.map((exerciseMode, index) => (
            <TouchableOpacity activeOpacity={1} style={{ marginBottom: 15 }}
              onPress={() => {onPress(index)}}
            >
              <View key={index}>
                <ExerciseImage
                  level={exerciseMode.level}
                  name={exerciseMode.name}
                  image={exerciseMode.image}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3776D4",
    justifyContent: "flex-start",
  },
});

export default ExerciseMode;
