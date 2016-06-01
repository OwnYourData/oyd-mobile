import LoginView from './views/loginview';
import Login from './common/components/login';
import Overview from './views/overview';
import PiaConfigurationView from './views/PiaConfigurationView';
import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';


import QRCodeScreen from './QRCodeScreen';
class Navigation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      configuration: null
    }
  }

  render() {
    if (this.state.initialized === false) {
      AsyncStorage.getItem('configuration', (err, result) => {
        if (result) {
            this.setState({initialized: true,configuration: JSON.parse(result)});
        } else {
          this.setState({initialized: true});
        }
      });
    }

    if (this.state.initialized) {
      if (this.state.configuration) {
        return  (<Navigator initialRoute={{id: 'login'}} renderScene={this.navigatorRenderScene}/>);
      } else {
        return  (<Navigator initialRoute={{id: 'piaconfiguration'}} renderScene={this.navigatorRenderScene}/>);
      }
    } else {
      return (<Text>Loading...</Text>);
    }

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
