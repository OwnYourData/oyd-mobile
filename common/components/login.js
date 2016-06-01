import React, { Component } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base64 from 'base-64';
import Input from './input';
import LoginForm from './LoginForm';
import LoginQR from './LoginQR';
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

var QRCodeScreen = require('./../../QRCodeScreen.ios.js');

class Login extends Component {
  constructor(props) {
    super(props);
    console.log('properties: '+props.piaAddress);
    this.state = {
      username: 'admin',
      password: 'admin',
      piaAddress: props.piaAddress,
      piaIdentifier: props.piaIdentifier,
      piaSecret: props.piaSecret,
      error: null
    }
  }

   render(){
     return (
       <Image source={require('./../../login_background.png')} style={styles.background}>
       <View style={styles.container}>
              <Image source={require('./../../logo.png')} style={styles.logo} />

             <View style={styles.form}>
                <Input placeholder="Username"  onChangeText={(text) => {this.setState({username: text})}}/>
                <Input ref="password" placeholder="Password" secret={true}   onChangeText={(text) => {this.setState({password: text})}}/>
             </View>

             <View style={styles.quarterHeight}>
              <Button style={styles.authenticate} onPress={this.authenticate.bind(this)}>
                  Authenticate
              </Button>

              {this.state.error ? <Text>{this.state.error_description}</Text> : false}
             </View>
         </View>
          </Image>
     )
   }

  onPressQRCode() {
      this.props.navigator.replace({
        id: 'qr',
        passProps: {
          onSucess: this.onSucess.bind(this)
        }
      });
      /*
   this.props.navigator.push({
     component: QRCodeScreen,
     title: 'QRCode',
     passProps: {
       onSucess: this.onSucess,
     },
   });
   */
 }

 onSucess(result) {
   console.log(result);
     this.props.navigator.replace({id: 'overview'});
 }

   authenticate() {
     this.setState({error:undefined});
     var data = "username=" +  encodeURIComponent(this.state.username) + "&password="
                    + encodeURIComponent(this.state.password) + "&grant_type=password&scope=read%20write&" +
                    "client_secret="+this.state.piaSecret+"&client_id="+this.state.piaIdentifier;
     var headers = new Headers();
     headers.append("Authorization", "Basic " + Base64.encode('piaapp:'+this.state.piaSecret));
     headers.append("Accept", "application/json");
     headers.append("Content-Type","application/x-www-form-urlencoded");
     console.log('sending request to'+this.state.piaAddress);
    fetch('http://'+this.state.piaAddress+'/oauth/token', {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then((response) => response.text())
    .then((responseText) => {
        var response = JSON.parse(responseText);
        if (response.error) {
          this.setState({error: response.error, error_description: response.error_description});
        } else {
          this.props.navigator.replace({id: 'overview'});
        }
      })
    .catch((error) => {
        console.warn(error);
    })
    .done();
   }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
      flex: .7,
      width: 300,
      resizeMode: 'contain',
    },
    top: {
        flex: .7,
        alignItems: 'stretch'
    },
    form: {
        width: 250,
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius: 3,
        paddingBottom: 20
    },
    quarterHeight: {
        flex: .25,
        backgroundColor: 'transparent',
        alignItems: 'stretch',
    },
    containerUsername: {
      backgroundColor: 'red',
      borderColor: 'gray',
      borderWidth: 0,
      borderBottomWidth: 1
    },
    username: {
      height: 50,
      margin: 5
    },
    authenticate: {
      margin:20,
      height: 40,
      padding: 10,
      color: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderBottomLeftRadius: 1,
      borderRadius: 10
    }
});

export default Login
