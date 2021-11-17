import React from "react";
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    name: Yup.string()
        .required('Username is Required'),
    password:  Yup.string()
        .required('Password is Required'),
});

const initialValues = {
    name: '',
    password: ''
}

const loginPage = () => {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values, {resetForm}) => {
                // do something
                console.log(values)
                resetForm({values: initialValues})
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
    
                <Image style={styles.logo} source={require('../assets/picture/logo.png')} />
    
                <View style={styles.form}>
    
                    <Text style={styles.textHeader}>Login</Text>
    
                    <Text style={styles.textField}>Username</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    <Text style={styles.errorMessage}><ErrorMessage name="name" /></Text>
    
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
        height: 400,
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
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    textHeader:{
        justifyContent: 'flex-start',
        fontWeight: "bold",
        color: '#000',
        fontSize: 30,
        marginBottom: 30 
    },
    textField:{
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5
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
