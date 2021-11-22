import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const Item = ({ data }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={styles.picture}
        source={require("../assets/picture/logo.png")}
      />
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <Text style={styles.title}>{data.name}</Text>
        <IsnumOrtime num={data.num} time={data.time} />
      </View>
    </View>
  </View>
);

const IsnumOrtime = (props) => {
  if (props.num != 0) {
    return <Text style={{ fontWeight: "400" }}>x {props.num}</Text>;
  } else {
    return <Text style={{ fontWeight: "400" }}>{props.time}s</Text>;
  }
};

const listOfExercisePage = (props) => {

  const DATA = props.route.params.data;
  console.log(DATA);

  const renderItem = ({ item }) => <Item data={item} />;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          // keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.fixed}>
        <TouchableOpacity style={styles.button} 
            onPress = {() => {props.navigation.navigate('ExercisePage', {data: DATA})}}
        >
          <Text style={styles.textButton}>STRAT</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderColor: "#000",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
  },
  picture: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  fixed: {
    justifyContent: "center",
    alignItems: "center",
    position: "flex",
    height: 60,
    backgroundColor: "#3776D4",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 30,
  },
  textButton: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default listOfExercisePage;
