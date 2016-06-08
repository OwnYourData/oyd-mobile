import React, { Component } from 'react';
import Button from 'react-native-button';
import Input from './input';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Slider,
  DatePickerIOS,
  Picker,
  PickerIOS,
  Switch,
  TouchableOpacity,
  View
} from 'react-native';


class LoginQR extends Component {
constructor(props) {
  super(props);
  this.state = {
    username: 'admin',
    password: 'admin',
    piaAddress: 'localhost:8080',
    piaSecret: 'mySecretOAuthSecret',
    error: null
  }
}

  render() {
    return (
      <View style={styles.form}>
         <Input placeholder="Username"  onChangeText={(text) => {this.setState({username: text})}}/>
         <Input placeholder="Password" secret={true}   onChangeText={(text) => {this.setState({password: text})}}/>
         <Button style={styles.scan} onPress={this.scan.bind(this)}>
                   Scan QR
          </Button>
      </View>
    );
  }

  scan() {
    this.props.navigator.replace({
      id: 'qr',
    });
  }
}

const styles = StyleSheet.create({
  form: {
      width: 250,
      backgroundColor:'rgba(255,255,255,0.5)',
      borderRadius: 3,
      paddingBottom: 20
  },
  scan: {
        margin:20,
        height: 40,
        padding: 10,
        color: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderBottomLeftRadius: 1,
        borderRadius: 10
      }
})

export default LoginQR;
