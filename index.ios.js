import LoginView from './views/loginview';
import Login from './common/components/login';
import Overview from './views/overview';
import PiaConfigurationView from './views/PiaConfigurationView';
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';


import QRCodeScreen from './QRCodeScreen';
class Navigation extends Component{
  render() {
    return (
      <Navigator
        initialRoute={{id: 'piaconfiguration'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'login':
        return (<Login navigator={navigator} {...route.passProps} title="Login"/>);
      case 'piaconfiguration':
        return (<PiaConfigurationView navigator={navigator} title="PIA Configuration"/>);
      case 'overview':
        return (<Overview navigator={navigator} title="Overview"/>)
      case 'qr':
          return (<QRCodeScreen navigator={navigator} {...route.passProps} title="QRScan"/>)
    }
  }
}


AppRegistry.registerComponent('oyd', () => Navigation);
