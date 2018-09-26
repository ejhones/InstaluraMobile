/** @format */

import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';
import AluraLingua from './src/screens/AluraLingua';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);
Navigation.registerComponent('AluraLingua', () => AluraLingua);

AsyncStorage.getItem('token')
    .then(token => {

        if (token) {
            return{
                screen:'Feed',
                title: 'Instalura',
            };
        }
        return {
            screen: {
                screen: 'Login',
                title: 'Login'
            }
        }
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'Login',
//         title: 'Login'
//     }
// })