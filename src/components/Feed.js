import React, {Component} from 'react';
import {StyleSheet, FlatList,View, Button, AsyncStorage} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../service/InstaluraFetchService';

export default class Feed extends Component {

    constructor() {
      super();
      this.state = {
        fotos: []
      }
    }

    componentDidMount() {
        InstaluraFetchService.get('/fotos')
            .then(json => this.setState({ fotos: json }));

        //const uri = 'https://instalura-api.herokuapp.com/api/fotos'

        // AsyncStorage.getItem('token')
        //     .then(token => {
        //         return {
        //             headers: new Headers({
        //                 'X-AUTH-TOKEN': token
        //             })
        //         }
        //     })
        //     .then(requestInfo => fetch(uri, requestInfo))
        //     .then(resposta => resposta.json())
        //     .then(json => this.setState({ fotos: json }));
    }

    like = (idFoto) => {
        const foto = this.buscarPorId(idFoto);

        AsyncStorage.getItem('usuario')
        .then(usuarioLogado => {
            let novaLista = [];
            
            if (!foto.likeada) {
                novaLista = [
                    ...foto.likers,
                    { login: usuarioLogado }
                ];
            } else {
                novaLista = foto.likers.filter(liker => {
                    return liker.login !== usuarioLogado
                });
            }
            return novaLista;
            })
        .then(novaLista => {
            const fotoAtualizada = {
                ...foto,
                likeada: !foto.likeada,
                likers: novaLista
            };
    
            this.atualizaFoto(fotoAtualizada);
        });

        InstaluraFetchService.post(`/fotos/${idFoto}/like`);

    }

    adicionarComentario = (idFoto, valorComentario, inputComentario) => {

        

        if (valorComentario === '')
            return;

        const foto = this.buscarPorId(idFoto);

        if (!foto) {
            return;
        }

        const comentario = {
            texto: valorComentario
        };

        InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
        .then(comentario => [...foto.comentarios, comentario])
        .then(novaLista => {
            const fotoAtualizada = {
                ...foto,
                comentarios: novaLista
            }
            this.atualizaFoto(fotoAtualizada);
            inputComentario.clear();
        });
    }

    buscarPorId(idFoto){
        return this.state.fotos.find(foto => foto.id === idFoto);
    }

    atualizaFoto(fotoAtualizada) {

        const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto);

        this.setState({ fotos });
    }
    
    render() {
        return (
        <View>
            <Button title='Modal' onPress={()=>{this.props.navigator.showModal({
                screen: 'AluraLingua',
                title: 'Alura Lingua'
            })}}
        />
          <FlatList style={styles.container}
            keyExtractor={item => String(item.id) }
            data={this.state.fotos}
            renderItem={({item}) =>
                <Post foto={item} likeCallback={this.like}
                comentarioCallback={this.adicionarComentario} />
            }
          />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
     /*marginTop: Plataform.OS == 'ios' ? 20 : 0,*/
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  }
});