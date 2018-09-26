import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { foto, likeCallback, comentarioCallback } = this.props;

        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDePerfil} />
                    <Text style={[styles.titulo, foto.isActive && styles.tituloAtivo]}>{foto.loginUsuario}</Text>
                </View>
                <View>
                    <Image source={{ uri: foto.urlFoto }} style={styles.foto} />
                </View>
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback}/>
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}

                    <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback}/>

                </View>
            </View>
        );
    }

    exibeLegenda(foto) {
        if (foto.comentario === '') {
            return;
        } else {
            return (<View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
            );
        }
    }   
}

const styles = StyleSheet.create({
    cabecalho: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fotoDePerfil: {
        marginRight: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    foto: {
        width: width,
        height: width,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    tituloAtivo: {
        color: 'red',
    },
    rodape: {
        margin: 10,
    },
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    },
});