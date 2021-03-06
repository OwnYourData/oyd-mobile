import React, { Component } from 'react';
import Button from 'react-native-button';
import Base64 from 'base-64';
import Input from './input';
import {
  AppRegistry,
  AsyncStorage,
    Dimensions,
  Image,
  Keyboard,
    LayoutAnimation,
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

var QRCodeScreen = require('./../../QRCodeScreen');

class Login extends Component {
  constructor(props) {
    super(props);
    console.log('properties: '+props.piaAddress);
    this.state = {
      username: '',
      password: '',
      piaAddress: props.piaAddress,
      piaIdentifier: props.piaIdentifier,
      piaSecret: props.piaSecret,
      error: null
    }

    AsyncStorage.getItem('configuration', (err, result) => {
      if (result) {
          var json = JSON.parse(result);
        this.setState({piaAddress: json.piaAddress, piaIdentifier: json.piaIdentifier, piaSecret: json.piaSecret, username: json.username });
      }
    });
  }


   render(){
     return (
       <Image source={require('./../../login_background.png')} style={styles.background}>
       <View style={[styles.container]}>
              <Image source={require('./../../logo.png')} style={[styles.logo]} />
             <View style={styles.form}>
                <Input placeholder="Benutzer" value={this.state.username} onChangeText={(text) => {this.setState({username: text})}}/>
                <Input ref="password" placeholder="Passwort" secret={true}   onChangeText={(text) => {this.setState({password: text})}}/>
             </View>

             <View style={styles.quarterHeight}>
              <Button style={styles.authenticate} onPress={this.authenticate.bind(this)}>
                  Anmelden
              </Button>

              {this.state.error ? <Text>{this.state.error_description}</Text> : false}
             </View>
         </View>
          </Image>
     )
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
    fetch(this.state.piaAddress+'/oauth/token', {
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
          AsyncStorage.setItem('token', JSON.stringify(response));
          AsyncStorage.setItem('configuration',JSON.stringify(
            {piaAddress: this.state.piaAddress, piaIdentifier: this.state.piaIdentifier, piaSecret: this.state.piaSecret, username: this.state.username}
          ),() => {
              this.props.navigator.replace({id: 'overview'});
          });
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
    //resizeMode: 'cover',
    width: null,
    height: null,
  },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        height: 150,
        width: 150,
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
    },
    back: {
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
