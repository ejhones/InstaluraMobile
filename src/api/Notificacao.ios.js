import React from 'react';
import {AlertIOS} from 'react-native';

export default class Notificao{
    static exibe(titulo, mensagem){
        AlertIOS.show(titulo, mensagem);
    }
}