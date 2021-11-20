import React,{ useState } from "react";
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is Required'),
    password:  Yup.string()
        .required('Password is Required'),
});

const initialValues = {
    email: '',
    password: ''
}

const loginPage = (props) => {

    const [Error, setError] = useState('');

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values, {resetForm}) => {
                // do something
                axios.post("http://localhost:8888/login", {
                    email: values.email,
                    password: values.password,
                })
                .then((response) => {
                    console.log(response)
                    props.navigation.navigate('calculatePage')
                })
                .catch((err) => {
                    setError('Email หรือ Password ไม่ถูกต้อง กรุณาลองใหม่')
                    console.log(err);
                });
                console.log(values)
                resetForm({values: initialValues})
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>

                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Image style={styles.logo} source={require('../assets/picture/logo.png')} />
                    <Text style={styles.textHeader}>Login</Text>
                </View>

                <View style={styles.form}>

                    <Text style={styles.textField}>Email</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    <Text style={styles.errorMessage}><ErrorMessage name="email" /></Text>
    
                    <Text style={styles.textField}>Password</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        password={true} 
                    />
                    <Text style={styles.errorMessage}><ErrorMessage name="password" /></Text>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                    
                    <Text style={{color: '#900', fontSize: 10, marginTop: 5}}>{Error}</Text>

                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={{marginRight: 5, color: '#fff'}}>Don't have an account already?</Text>
                        <TouchableOpacity
                                onPress = {() => {
                                    props.navigation.navigate('register')
                                }}
                            >
                            <Text style={{color: '#900'}}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        backgroundColor: '#064273'
    },
    form:{
        width: 350,
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1da2d8',
        borderRadius:10,
        marginTop: 20
    },
    errorMessage:{
        fontSize: 12,
        color: '#CC0000'
    },
    logo: {
        width: 120,
        height: 120,
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
    },
    textButton:{
        fontSize: 20,
        color: "#fff",
    }
})

export default loginPage;
