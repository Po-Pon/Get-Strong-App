import React from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(8, 'Too Short!')
        .max(88, 'Too Long!')
        .required('Username is Required'),
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
});

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
}
 
const registerPage = () => {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, {resetForm}) => {
                // do something
                axios.post("http://localhost:5000/register", {
                    username: values.name,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    alert(err);
                });
                console.log(values)
                resetForm({values: initialValues})
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>

                <Image style={styles.logo} source={require('../assets/picture/logo.png')} />

                <View style={styles.form}>
                    <Text style={styles.textHeader}>Register</Text>
                    <Text style={styles.textField}>Username</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    <Text style={styles.errorMessage}><ErrorMessage name="name" /></Text>

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

                    <Text style={styles.textField}>Password Confirm</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('passwordConfirm')}
                        onBlur={handleBlur('passwordConfirm')}
                        value={values.passwordConfirm}
                        secureTextEntry={true}
                        password={true} 
                    />
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
        height: 500,
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
        fontWeight: "bold",
        color: '#000',
        fontSize: 30,
        marginTop: -20
    },
    textField:{
        color: '#fff',
        fontSize: 20,
        marginTop: 10
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

export default registerPage;