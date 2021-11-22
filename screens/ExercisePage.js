import { set } from "date-fns";
import React,{ useState,useEffect } from "react"
import { View,StyleSheet,Text,Image, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons} from '@expo/vector-icons';

// จับเวลา
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
                <TouchableOpacity style={styles.button}
                onPress={props.reRender}
                >
                    <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons style={{marginRight: 10}} name="check-bold" size={30} color="#fff"/>
                        <Text style={styles.buttonText}>
                            DONE
                        </Text>
                    </View> 
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity style={styles.button}
                onPress={stop}
                >
                    <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons style={{marginRight: 10}} name="play-pause" size={30} color="#fff"/>
                        <Text style={styles.buttonText}>
                            {Button}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    return(
        <View style={styles.container}>
            <Image style={styles.picture} source={require('../assets/picture/logo.png')}/>
            <Text style={styles.headerText}>{props.name}</Text>
            <Text style={styles.timer}>{`${mins}:${secs}`}</Text>
            <OnPress />
        </View>
    );
}

// จำนวนครั้ง
const ForNum = (props) =>{
    return(
        <View style={styles.container}>
            <Image style={styles.picture} source={require('../assets/picture/logo.png')}/>
            <Text style={styles.headerText}>{props.name}</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>x{props.num}</Text>
            <TouchableOpacity style={styles.button}
                onPress={props.reRender}
            >
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons style={{marginRight: 10}} name="check-bold" size={30} color="#fff"/>
                    <Text style={styles.buttonText}>
                        DONE
                    </Text>
                </View> 
            </TouchableOpacity>
        </View>
    );
}

const Check = (props) =>{
    if(props.time !== 0){
        return(
            <ForTime name={props.name} time={props.time} reRender={props.reRender}/>
        );
    }else if(props.num !== 0){
        return(
            <ForNum name={props.name} num={props.num} reRender={props.reRender}/>
        );
    }
}

const ExercisePage = (props) =>{

    const [count, setCount] = useState(0);

    const reRender = () =>{
        setCount(count+1)
        return(
            <ExercisePage />
        );
    }

    const DATA = props.route.params.data

    return(
        <Check
            name={DATA[count].name}
            num={DATA[count].num}
            time={DATA[count].time}
            reRender={reRender}
        />
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    picture:{
        width: 300,
        height: 300
    },
    timer: {
        fontSize: 40,
        padding: 10,
        fontWeight: 'bold',
    },
    headerText:{
        fontSize: 30,
        padding: 10
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
    }
})

export default ExercisePage;