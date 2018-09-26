import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, Button, AsyncStorage } from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            usuario: 'Rafael',
            senha: '123456',
            mensagem: '',
        }
    }

    efetuaLogin = () => {
        const uri = 'https://instalura-api.herokuapp.com/api/public/login';

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha,
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(uri, requestInfo).
            then(response => {
                if(response.ok){
                    //console.warn('ok');
                    return response.text();
                }else{
                    //console.warn(response);
                    throw new Error('Não foi possível efetuar o login!');
                }
            })
            .then(token => {
                console.warn('ok');

                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);

                this.props.navigator.resetTo({
                    screen: 'Feed',
                    title: 'Instalura',
                });
/*
                AsyncStorage.getItem('token').
                    then(token => console.warn(token));*/
            })
            .catch(error => this.setState({mensagem: error.mensagem}));
    }

    render() {
    
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput placeholder="Usuário..."
                        autoCapitalize="none"
                        onChangeText={texto => this.setState({ usuario: texto })} 
                        underlineColorAndroid="transparent"
                        defaultValue="Rafael"
                        style={styles.input}/>
                    
                    <TextInput placeholder="Senha..."
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={texto => this.setState({ senha: texto })} 
                        underlineColorAndroid="transparent"
                        defaultValue="123456"
                        style={styles.input}/>

                    <Button title="Login" onPress={this.efetuaLogin}/>
                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: width * 0.8,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', 
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    mensagem: {
        marginTop: 15,
        color: '#374c3c'
    }
});