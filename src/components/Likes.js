import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';


export default class Likes extends Component {


    render() {

        const { foto, likeCallback } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image source={this.carregaIcone(foto.likeada)} style={styles.botaoLike} />
                </TouchableOpacity>
                {this.exibirLikes(foto.likers)}
            </View>
        );
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    exibirLikes(likers) {
        if (likers.length <= 0) {
            return;
        } else {
            return (<Text style="{styles.likes}">{likers.length}
                {likers.length > 1 ? 'curtidas' : 'curtida'}</Text>);
        }
    }
}

const styles = StyleSheet.create({
    botaoLike: {
        width: 40,
        height: 40,
    },
    likes: {
        fontWeight: 'bold',
    },
});