import LoginView from './views/loginview';
import Overview from './views/overview'
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

class Navigation extends Component{
  render() {
    return (
      <Navigator
        /*style={styles.container}*/
        initialRoute={{id: 'login'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'login':
        return (<LoginView navigator={navigator} title="Login"/>);
      case 'overview':
        return (<Overview navigator={navigator} title="Overview"/>)
    }
  }
}


AppRegistry.registerComponent('oyd', () => Navigation);
