import React, {Component} from 'react';
import { AsyncStorage} from 'react-native';
import Post from '../components/Post';

export default class InstaluraFetchService{
    static get(recurso){
        return makeRequest(recurso);
        // const uri = 'https://instalura-api.herokuapp.com/api'+recurso;

        // return AsyncStorage.getItem('token')
        //     .then(token => {
        //         return {
        //             headers: new Headers({
        //                 'X-AUTH-TOKEN': token
        //             })
        //         }
        //     })
        //     .then(requestInfo => fetch(uri, requestInfo))
        //     .then(resposta => resposta.json());
    }

    static post(recurso, dados){
        return makeRequest(recurso, 'Post', dados);

        // const uri = 'https://instalura-api.herokuapp.com/api/' + recurso;
        // return AsyncStorage.getItem('token')
        // .then(token => {
        //     return{
        //         method: 'POST',
        //         body: JSON.stringify(dados),
        //         headers: new Headers({
        //             'X-AUTH-TOKEN': token,
        //             'Content-type': 'application/json' 
        //         })
        //     }
        // })
        // .then(requestInfo => fetch(uri, requestInfo))
        // .then(resposta => {
        //     if (resposta.ok) {
        //         return resposta.json()
        //     }
        //     throw new Error('Não foi possível completar a operação');
        // });
    }
}

function makeRequest(recurso, method='GET', dados){
    const uri = 'https://instalura-api.herokuapp.com/api/' + recurso;

    return AsyncStorage.getItem('token')
    .then(token => {
        return {
            method: method,
            body: JSON.stringify(dados),
            headers: new Headers({
                'X-AUTH-TOKEN': token,
                'Content-type': 'application/json' 
            })
        }
    })
    .then(requestInfo => fetch(uri, requestInfo))
    .then(resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error('Não foi possível completar a operação');
    });

}