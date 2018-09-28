import React, {Component} from 'react';
import {StyleSheet, FlatList,View, Button, AsyncStorage} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../service/InstaluraFetchService';
import Notificacao from '../api/Notificacao.android';
import HeaderUsuario from './HeaderUsuario';

export default class Feed extends Component {

    constructor() {
      super();
      this.state = {
        fotos: []
      }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(evento => {
            if (evento.id === 'willAppear') {
                this.carregaFotos();
            }
        });
    }

    carregaFotos(){
        let uri = '/fotos'

        if(this.props.usuario){
            uri = 'public/fotos/${this.props.usuario}'
        }

        InstaluraFetchService.get('/fotos')
            .then(json => this.setState({ fotos: json }));
    }


    like = (idFoto) => {
        const listaOriginal = this.state.fotos;
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

        InstaluraFetchService.post(`/fotos/${idFoto}/like`)
        .catch(e => {
            this.setState({fotos: listaOriginal});
            Notificacao.exibe('Ops..', 'Algo deu errado ao curtir');
        });

    }

    adicionarComentario = (idFoto, valorComentario, inputComentario) => {
        const listaOriginal = this.state.fotos;

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
        })
        .catch(e => {
            this.setState({fotos: listaOriginal});
            Notificacao.exibe('Ops..', 'Algo deu errado ao curtir');
        });
    }

    buscarPorId(idFoto){
        return this.state.fotos.find(foto => foto.id === idFoto);
    }

    atualizaFoto(fotoAtualizada) {

        const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto);

        this.setState({ fotos });
    }

    logout = () => {
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
        this.props.navigator.resetTo({
            screen: 'Login',
            title: 'Instalura'
        });
    }
    
    verPerfilUsuario = (idFoto) => {
        const foto = this.buscarPorId(idFoto);
        
        this.props.navigator.push({
            screen: 'PerfilUsuario',
            title: foto.loginUsuario,
            backButtonTitle: '',
            passProps:{
                usuario: foto.loginUsuario,
                fotoDePerfil: foto.urlPerfil
            }
        });
    }

    exibeHeader(){
        if (this.props.usuario) {
            return <HeaderUsuario {...this.props}
                posts={this.state.fotos.length}/>
        }else{
            return(<View>
                    <Button title='Logout' onPress={this.logout} />
                    <Button title='Modal' onPress={()=>{this.props.navigator.showModal({
                    screen: 'AluraLingua',
                    title: 'Alura Lingua'
                    })}}/>
                </View>)
        }
    }

    render() {
        return (
        <View>
            {this.exibeHeader()}
          <FlatList style={styles.container}
            keyExtractor={item => String(item.id) }
            data={this.state.fotos}
            renderItem={({item}) =>
                <Post foto={item} 
                likeCallback={this.like}
                comentarioCallback={this.adicionarComentario}
                verPerfilCallback={this.verPerfilUsuario} />
            }
          />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  }
});