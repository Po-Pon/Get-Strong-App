import React, { useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const Item = ({ data }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={styles.picture}
        source={{
          uri : data.image
        }}
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

    const userId = props.route.params.userId;
    console.log(userId)
    const DATA = props.route.params.data;
    const cal = props.route.params.cal;
    const duration = props.route.params.duration;
    const [DATAsum, setDATAsum] = useState([]);

    const renderItem = ({ item }) => <Item data={item} />;

      function sumData(array1, array2){
        for(let i = 0 ; i < array1.length ; i++){
            for(let j = 0 ; j <= 44 ; j++){
                if(array1[i].name === array2[j].name){
                    const data = {
                      name: array1[i].name,
                      num: array1[i].num,
                      time: array1[i].time,
                      image: array2[j].image
                    } 
                    setDATAsum(DATAsum => [...DATAsum, data]);
                }
            }
        }
    }

    async function get(){
        await axios.get("http://localhost:8888/api/exercise")
            .then((response) => {
              console.log(response.data)
              sumData(DATA, response.data)
              console.log(response.data)
              console.log(DATAsum)
            })
            .catch((err) => {
                console.log(err)
            })
    }
  
    useEffect(() => {
        get();
    }, [])

    return (
    <>
        <SafeAreaView style={styles.container}>
            <FlatList
            data={DATAsum}
            renderItem={renderItem}
            // keyExtractor={item => item.id}
            />
        </SafeAreaView>
        <View style={styles.fixed}>
            <TouchableOpacity style={styles.button} 
                onPress = {() => {props.navigation.navigate('ExercisePage', {data: DATAsum, cal:cal, duration:duration, userId: userId})}}
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
    width: 150,
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
