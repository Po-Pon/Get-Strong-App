import React, { useState }from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import { Avatar } from 'react-native-elements';
import { Ionicons,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import * as Yup from "yup";
import axios from "axios";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is Required'),
    password:  Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required('Password is Required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password Confirm is Required'),
    weight: Yup.number('only numbers')
        .required('Weight is Required'),
    height: Yup.number('only numbers')
        .required('Height is Required'),
    age: Yup.number('only numbers')
        .required('Age is Required'),
    gender: Yup.number()
        .required("Choose your gender")
    
});
 
const registerPage = (props) => {

    const [Gender, SetGender] = useState();
    const [Error, setError] = useState('');
    const [manIcon, setManIcon] = useState("man-outline");
    const [womanIcon, setWomanIcon] = useState("woman-outline");
 
    const initialValues = {
        email: '',
        password: '',
        passwordConfirm: '',
        // profilePicture: '',
        weight: '',
        height: '',
        age: '',
        gender: Gender
    }

    function selectSex(select) {
        if(select === "man"){
            SetGender(1);
            setManIcon("man");
            setWomanIcon("woman-outline");
        }
        else if(select === "woman"){
            SetGender(2);
            setWomanIcon("woman");
            setManIcon("man-outline");
        }
    }
    
    return(
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, {resetForm}) => {
                // do something
                axios.post("http://localhost:8888/register", {
                    email: values.email,
                    password: values.password,
                    // profilePicture: values.profilePicture,
                    weight: values.weight,
                    height: values.height,
                    age: values.age,
                    gender: values.gender
                })
                .then((response) => {
                    props.navigation.navigate('login')
                    console.log(response)
                })
                .catch((err) => {
                    setError('Email นี้ถูกใช้งานแล้ว')
                    console.log(err);
                });
                console.log(values)
                resetForm({values: initialValues})
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>

                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.logo} source={require('../assets/picture/logo.png')} />
                    <Text style={styles.textHeader}>Register</Text>
                </View>

                <View style={styles.form}>

                    {/* <Avatar
                        activeOpacity={0.2}
                        avatarStyle={{}}
                        containerStyle={{ backgroundColor: "#BDBDBD" }}
                        icon={{}}
                        iconStyle={{}}
                        imageProps={{}}
                        onLongPress={() => alert("onLongPress")}
                        onPress={() => alert("onPress")}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size="medium"
                        source={{ uri: "" }}
                        title="P"
                        titleStyle={{}}
                    /> */}
                    
                    <Text style={{color: '#900', fontSize: 16, marginTop: 10}}>{Error}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textField}>Gender :</Text>
                        <Ionicons style={{marginTop: 10}} name={manIcon} size={30} color="#000" 
                            onPress= {() => {selectSex("man")}}
                        />
                        <Ionicons style={{marginTop: 10}} name={womanIcon} size={30} color="#000" 
                            onPress= {() => {selectSex("woman")}}
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="gender" /></Text>

                    <Text style={styles.textField}>Weight</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <MaterialCommunityIcons name='weight-kilogram' size={30} color='#fff'/>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight}
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="weight" /></Text>

                    <Text style={styles.textField}>Height</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <MaterialCommunityIcons name='human-male-height' size={30} color='#fff'/>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('height')}
                            onBlur={handleBlur('height')}
                            value={values.height}
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="height" /></Text>
                        
                    <Text style={styles.textField}>Age</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <FontAwesome5 name='users' size={30} color='#fff'/>
                        <FontAwesome5 ></FontAwesome5>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('age')}
                            onBlur={handleBlur('age')}
                            value={values.age}
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="age" /></Text>
                    
                    <Text style={styles.textField}>Email</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <MaterialCommunityIcons name='email' size={30} color='#fff'/>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="email" /></Text>

                    <Text style={styles.textField}>Password</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <MaterialCommunityIcons name='lock' size={30} color='#fff'/>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                            password={true} 
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="password" /></Text>

                    <Text style={styles.textField}>Password Confirm</Text>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        <MaterialCommunityIcons name='lock' size={30} color='#fff'/>
                        <TextInput style={styles.textInput}
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                            secureTextEntry={true}
                            password={true} 
                        />
                    </View>
                    <Text style={styles.errorMessage}><ErrorMessage name="passwordConfirm"/></Text>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                        <Text style={styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#064273'
    },
    form:{
        width: 350,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1da2d8',
        borderRadius:10
    },
    errorMessage:{
        fontSize: 12,
        color: '#CC0000'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    textHeader:{
        fontWeight: "bold",
        color: '#fff',
        fontSize: 30,
        marginLeft: 20,
        marginTop: 30,
        textShadowColor: '#000',
        textShadowOffset: {width: 4, height: 4}
    },
    textField:{
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        textShadowColor: '#000',
        textShadowOffset: {width: 1, height: 1}
    },
    textInput:{
        width:200,
        height:30,
        borderColor: '#F5F5F5', 
        borderWidth: 1,
        borderRadius: 5,
    },
    button:{
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 50,
        fontSize: 20,
        color: "#fff",
        borderRadius: 10,
        backgroundColor: "#003f59",
        marginTop: 20,
        marginBottom: 20
    },
    textButton:{
        fontSize: 20,
        color: "#fff",
    }
})

export default registerPage;