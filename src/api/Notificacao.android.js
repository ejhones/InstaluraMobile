import React from 'react';
import {ToastAndroid} from 'react-native';

export default class Notificao{
    static exibe(titulo, mensagem){
        ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    }
}