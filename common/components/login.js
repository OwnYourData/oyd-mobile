import React, { Component } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base64 from 'base-64';
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
  View
} from 'react-native';

class Login extends Component {
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

   render(){
     return (
       <View style={styles.container}>
              <Image source={require('./../../logo.png')} style={styles.logo} />
             <View style={styles.form}>
                <Input placeholder="Username"  onChangeText={(text) => {this.setState({username: text})}}/>
                <Input ref="password" placeholder="Password" secret={true}   onChangeText={(text) => {this.setState({password: text})}}/>
                <Input ref="piaAddress" placeholder="PIA Address"  onChangeText={(text) => {this.setState({piaAddress: text})}}/>
                <Input ref="piaSecret" placeholder="PIA Secret" secret={true} onChangeText={(text) => {this.setState({piaSecret: text})}}/>
                <View/>
             </View>

             <View style={styles.quarterHeight}>
              <Button style={styles.authenticate} onPress={this.authenticate.bind(this)}>
                  Authenticate
              </Button>
              {this.state.error ? <Text>{this.state.error_description}</Text> : false}
             </View>
         </View>
     )
   }

   authenticate() {
     this.setState({error:undefined});
     var data = "username=" +  encodeURIComponent(this.state.username) + "&password="
                    + encodeURIComponent(this.state.password) + "&grant_type=password&scope=read%20write&" +
                    "client_secret="+this.state.piaSecret+"&client_id=piaapp";
     var headers = new Headers();
     headers.append("Authorization", "Basic " + Base64.encode('piaapp:'+this.state.piaSecret));
     headers.append("Accept", "application/json");
     headers.append("Content-Type","application/x-www-form-urlencoded");
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
