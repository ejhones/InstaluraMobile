import React, {Component} from 'react';
import {StyleSheet, FlatList,View, Button} from 'react-native';
import Post from './Post';

export default class Feed extends Component {

    constructor() {
      super();
      this.state = {
        fotos: []
      }
    }

    componentDidMount() {
      fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(resposta => resposta.json())
        .then(json => this.setState({fotos: json}));
    }

    async apiFetch() {
      const resposta = await fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael');

      const json = await resposta.json();

      this.setState({fotos: json});
    }
    
    like = (idFoto) => {
        const foto = this.buscarPorId(idFoto);

        let novaLista = [];

        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                { login: 'meuUsuario' }
            ];
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            });
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }

        this.atualizaFoto(fotoAtualizada);
    }

    adicionarComentario = (idFoto, valorComenario, inputComentario) => {
    
        if (valorComenario === '')
            return;
        
        const foto = this.buscarPorId(idFoto);

        const novaLista = [...foto.comentarios, {
            id: valorComenario,
            login: 'meuUsuario',
            texto: valorComenario,
        }];

        const fotoAtualizada = {
            ...foto,
            comentarios: novaLista,
        }

        this.atualizaFoto(fotoAtualizada);

        inputComentario.clear();
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