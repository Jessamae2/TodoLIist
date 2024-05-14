import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Image} from 'react-native'
import React, { Profiler, useState } from 'react'
import { FIREBASE_AUTH } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'


const Login = () => {
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error: any) {
        console.log(error)
        alert('Sign in failed: ' + error.message);
    } finally {
        setLoading(false);
    }
}

const signUp = async () => {
    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
    alert('Check your emails');
} catch (error: any) {
    console.log(error);
    alert('Sign in failed: ' + error.message);
} finally {
    setLoading(false);
}
}


    return (
        <View style={styles.container}>
            <View style={styles.profile1}>
                <Image
                source={require("../assets/image2.png")}
                style={styles.profile}
                 ></Image>
            </View>
        <Text style={styles.text1}>Your Personal Task Manager</Text>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' autoCapitalize='none' 
            onChangeText={(text) => setPassword(text)}   ></TextInput>
        
        { loading ? (
            <ActivityIndicator size="large" color="#000ff" /> 
    ) : (
            <>
        <TouchableOpacity style={styles.button} onPress={signIn} >
        <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.or}>or</Text>
        <TouchableOpacity style={styles.button1} onPress={signUp}>
        <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        </>
    )}
        </View>
    );
};

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#E7CBCB",
        
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 20,
        backgroundColor: '#99627A',
        height: 40,
        marginTop: 10
    },
    button1: {
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 20,
        backgroundColor: '#99627A',
        height: 40
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        color: 'white',
        marginTop: 7,
    },
    or: {
        textAlign: 'center',
        margin: 10
    },
    profile: {
        height: 250,
        width: 300,
    },
    text1: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
        height: 50,
        color: 'black',
        marginBottom: 10,
      
    },
    profile1: {
        justifyContent: 'center',
        alignItems: 'center',
    }


})