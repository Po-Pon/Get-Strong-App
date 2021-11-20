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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";



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
          <TouchableOpacity activeOpacity={1} style={{ marginBottom:15}}>
            <ExerciseImage />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ marginBottom:15}}>
            <ExerciseImage />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const ExerciseImage = () => (
  <>
    <Image
      source={{
        uri: "https://cdn.muscleandstrength.com/sites/default/files/field/image/workout/beginnerabs.jpg",
      }}
      style={{ width: "100%", height: 180, borderRadius: 15 }}
    />
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
        }}
      >
        ABS BEGINNER
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
