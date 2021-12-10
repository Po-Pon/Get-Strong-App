import { set } from "date-fns";
import React,{ useState,useEffect } from "react"
import { View,StyleSheet,Text,Image, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { color } from "react-native-reanimated";
import axios from "axios";

// หน้าจับเวลา
const ForTime = (props) =>{

    const formatNumber = number => `0${number}`.slice(-2); // หรือ ('0' + (number).toString()).slice(-2)

    const getTimer = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60; 
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    };

    const [Timer, setTimer] = useState(props.time);
    const [Start, SetStart] = useState(false);
    const [Button, setButton] = useState('PAUSE')

    const { mins, secs } = getTimer(Timer);

    function start(){
        SetStart(true);
    };

    const stop = () => {
        if(Button == 'PAUSE'){
            setButton('RESUME')
        }else{
            setButton('PAUSE')
        }
        SetStart(!Start);
    };
    
    useEffect(() => {
        start();
    }, [])

    useEffect(() => {
        let interval = null;
        if (Start) {
            interval = setInterval(() => {
                setTimer(Timer => Timer - 1);
            }, 1000);
        } 
        if (Timer === 0){
            SetStart(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [Start, Timer]);


    const OnPress = () =>{
        if(Timer == 0){
            return(
                <TouchableOpacity style={styles1.button}
                onPress={props.reRender}
                >
                    <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons style={{marginRight: 10}} name="check-bold" size={30} color="#fff"/>
                        <Text style={styles1.buttonText}>
                            DONE
                        </Text>
                    </View> 
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity style={styles1.button}
                onPress={stop}
                >
                    <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons style={{marginRight: 10}} name="play-pause" size={30} color="#fff"/>
                        <Text style={styles1.buttonText}>
                            {Button}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    return(
        <View style={styles1.container}>
            <Image style={styles1.picture} 
                source={{
                    uri: props.image
                }}
            />
            <Text style={styles1.headerText}>{props.name}</Text>
            <Text style={styles1.timer}>{`${mins}:${secs}`}</Text>
            <OnPress />
        </View>
    );
}

// หน้าจำนวนครั้ง
const ForNum = (props) =>{
    return(
        <View style={styles1.container}>
            <Image style={styles1.picture} 
                source={{
                    uri: props.image
                }}
            />
            <Text style={styles1.headerText}>{props.name}</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>x{props.num}</Text>
            <TouchableOpacity style={styles1.button}
                onPress={props.reRender}
            >
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons style={{marginRight: 10}} name="check-bold" size={30} color="#fff"/>
                    <Text style={styles1.buttonText}>
                        DONE
                    </Text>
                </View> 
            </TouchableOpacity>
        </View>
    );
}

// หน้า result
const ForSuccess = (props) =>{

    const [SaveText,setSaveText] = useState('SAVE');
    const [alert, setAlert] = useState('');

    async function SaveData(){
        await axios.put(`http://localhost:8888/api/${props.userId}`, {
            burn: props.cal,
            mode: props.mode
        }).then((response) => {
            console.log(response)
            setSaveText('')
            setAlert('YOU HAVE SAVED YOUR DATA')
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <>
            <View style={styles2.container}>
                <Image style={styles2.trophy} source={require("../assets/picture/trophy.png")}/>
                <Text style={styles2.headerText}>
                    Nice you've done it!
                </Text>
                <View style={{flexDirection: 'column', flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 30}}>
                            <Text style={styles2.text1}>{props.exercises}</Text>
                            <Text style={styles2.text2}>Exercises</Text>
                        </View>
                        <View style={{padding: 30}}>
                            <Text style={styles2.text1}>{props.cal}</Text>
                            <Text style={styles2.text2}>kcal</Text>
                        </View>
                        <View style={{padding: 30}}>
                            <Text style={styles2.text1}>{props.duration}</Text>
                            <Text style={styles2.text2}>Duration</Text>
                        </View>
                    </View>
                    <View style={styles2.buttonContainer}>
                        <TouchableOpacity
                            onPress = {() => {props.goBack()}}
                        >
                            <Text  style={styles2.buttonText}>DO IT AGAIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => {SaveData();}}
                        >
                            <Text  style={styles2.buttonText}>{SaveText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => {props.navigate('FeaturePage', {userId: props.userId})}}
                        >
                            <Text  style={styles2.buttonText}>QUIT</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 15, textAlign: 'center', color:'#5CFF5C', marginTop: 30 }}>{alert}</Text>
                </View>
            </View>
        </>
    );
}

// check ว่าจะ return หน้าไหน
const Check = (props) =>{
    if(props.success == true){
        return(
            <ForSuccess 
                exercises={props.exercises} cal={props.cal} mode={props.mode} duration={props.duration} navigate={props.navigate} goBack={props.goBack} userId={props.userId}
            />
        );
    }
    else if(props.time !== 0){
        return(
            // <ForSuccess />
            <ForTime name={props.name} time={props.time} image={props.image} reRender={props.reRender}/>
        );
    }else if(props.num !== 0){
        return(
            // <ForSuccess />
            <ForNum name={props.name} num={props.num} image={props.image} reRender={props.reRender}/>
        );
    }
}

const ExercisePage = (props) =>{

    const [count, setCount] = useState(0);
    const userId = props.route.params.userId;
    const DATA = props.route.params.data;
    const cal = props.route.params.cal;
    const duration = props.route.params.duration;

    const reRender = () =>{
        setCount(count => count+1)
    }

    const Run = () => {
        if(count == DATA.length){
            return(
                <Check
                    success={true}
                    exercises={DATA.length}
                    mode={props.route.params.modeName}
                    cal={cal}
                    duration={duration}
                    navigate={props.navigation.navigate}
                    goBack={props.navigation.goBack}
                    userId={userId}
                />
            );
        }else{
            return(
                <Check
                    name={DATA[count].name}
                    num={DATA[count].num}
                    time={DATA[count].time}
                    image={DATA[count].image}
                    reRender={reRender}
                />
            );
        }
    }

    return(
        <Run/>
    );
}


const styles1 = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    picture:{
        width: 400,
        height: 300
    },
    timer: {
        fontSize: 40,
        padding: 10,
        fontWeight: 'bold',
    },
    headerText:{
        fontSize: 30,
        padding: 10,
        textAlign: 'center'
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 150,
        height:50,
        backgroundColor:'#0000FF',
        marginTop: 20
    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        paddinf:10,
        fontWeight: 'bold'
    },
})

const styles2 = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#0C2D48'
    },
    trophy:{
        width: 200,
        height: 200,
        marginTop: 30,
    },
    headerText:{
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
        color: '#fff'
    },
    text1:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
    text2:{
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default ExercisePage;