import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default class AluraLingua extends Component{
    removerModal = () =>{
        Navigation.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../../resources/img/aluralingua.png')} style={styles.img}/>

                <TouchableOpacity  title='Aprender Inglês'  style={styles.bottom}>
                    <Text >Aprender Inglês</Text>
                </TouchableOpacity>
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
    img: {
        flex: 8,
    },
    bottom: {
        flex: 2,
    }
});