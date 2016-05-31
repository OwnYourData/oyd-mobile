/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './../common/components/login'
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image source={require('./../login_background.png')} style={styles.container}>
          <Login navigator={this.props.navigator}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
});


export default LoginView
