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

const exerciseModes = [
  {
    name: "ABS BEGINNER",
    image:
      "https://static.india.com/wp-content/uploads/2017/07/Abs-415x246.jpg",
    list: [
      {
        name: "JUMPING JACK",
        time: 20,
        num: 0,
      },
      {
        name: "ABDOMINAL CRUNCHES",
        time: 0,
        num: 16,
      },
      {
        name: "RUSSIAN TWIST",
        time: 0,
        num: 20,
      },
    ],
  },
  {
    name: "CHEST BEGINNER",
    image:
      "https://cdn.shopify.com/s/files/1/1127/3530/articles/advanced-chest-training-04.jpg?v=1478476305",
    list: [
      {
        name: "JUMPING JACK",
        time: 20,
        num: 0,
      },
      {
        name: "ABDOMINAL CRUNCHES",
        time: 0,
        num: 16,
      },
      {
        name: "RUSSIAN TWIST",
        time: 0,
        num: 20,
      },
    ],
  },
  {
    name: "LEG BEGINNER",
    image: "https://i.ytimg.com/vi/S5kOK3bxfro/maxresdefault.jpg",
    list: [
      {
        name: "JUMPING JACK",
        time: 20,
        num: 0,
      },
      {
        name: "ABDOMINAL CRUNCHES",
        time: 0,
        num: 16,
      },
      {
        name: "RUSSIAN TWIST",
        time: 0,
        num: 20,
      },
    ],
  },
];

export default function ListOfExercisePage() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 15 }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10,
            }}
          >
            BEGINNER
          </Text>
          {exerciseModes.map((exercisMode, index) => (
            <TouchableOpacity activeOpacity={1} style={{ marginBottom: 15 }}>
              <View key={index}>
                <ExerciseImage
                  name={exercisMode.name}
                  image={exercisMode.image}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
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
      <Icon name="dumbbell" color="#fff" size={30} />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3776D4",
    justifyContent: "flex-start",
  },
});
