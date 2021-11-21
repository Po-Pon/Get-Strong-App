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

const ExerciseMode = (props) => {

  const exerciseModes = props.route.params.data;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3776D4",
    justifyContent: "flex-start",
  },
});

export default ExerciseMode;
