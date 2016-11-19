import React, { Component } from 'react';
import Button from 'react-native-button';
import Input from './../common/components/input';
import {
  AppRegistry,
  Dimensions,
  Image,
  Keyboard,
LayoutAnimation,
  StyleSheet,
    KeyboardAvoidingView,
  Text,
  TextInput,
  Slider,
  DatePickerIOS,
  Picker,
  PickerIOS,
  VibrationIOS,
  Switch,
  TouchableOpacity,
  View
} from 'react-native';

class PiaConfigurationView extends Component {
  constructor(props) {
    super(props);
    console.log('constructor called');
    this.state = {
      piaIdentifier: '',
      piaAddress: '',
      piaSecret: ''
    };

    if (this.nextState) {
      this.setState(this.nextState);
    }
  }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    keyboardDidShow (e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            keyboardShown : true,
        });
    }

    keyboardDidHide (e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            keyboardShown : false,
        });
    }
    render() {
    return (
        <View style={styles.main}>
      <Image source={require('./../login_background.png')} style={styles.background}>
          <View style={ [styles.container] }>
              {this.renderLogo()}
            <View style={styles.form}>
                {this.renderQR()}
               <Input ref="piaAddress" placeholder="Adresse des Datentresors" value={this.state.piaAddress} onChangeText={(text) => {this.setState({piaAddress: text})}}/>
               <Input ref="piaIdentifier" placeholder="Kennung (Identifier)"  value={this.state.piaIdentifier} onChangeText={(text) => {this.setState({piaIdentifier: text})}}/>
               <Input ref="piaSecret" placeholder="Passwort (Secret)" value={this.state.piaSecret} secret={true} onChangeText={(text) => {this.setState({piaSecret: text})}}/>
            </View>

            <View>
             <Button style={styles.configure} onPress={this.onConfigure.bind(this)}>
                 Weiter
             </Button>
            </View>
        </View>
      </Image>
            </View>
    );
  }

  renderLogo() {
    if (false) {
        return null;
    } else {
        return (
            <Image source={require('./../logo.png')} style={[styles.logo]}/>
        );
    }
  }

  renderQR() {
      if(this.state.keyboardShown) {
          return null;
      } else {
          return (
              <View>
              <Button style={styles.scan} onPress={this.onPressQRCode.bind(this)}>
                  QR Code scannen
              </Button>
              <Text style={styles.description}>oder selbst eingeben</Text>
                  </View>
          );
      }
  }

  onPressQRCode() {
      this.props.navigator.push({
        id: 'qr',
        passProps: {
          onSucess: this.onSucess.bind(this)
        }
      });
 }

 onSucess(result) {
   var json = JSON.parse(result);
   this.setState({piaAddress: json.protocol+json.host, piaIdentifier: json.id, piaSecret: json.secret});
 }

  onConfigure() {
      this.props.navigator.push({
        id: 'login',
        passProps: {
          piaAddress: this.state.piaAddress.startsWith('http') ? this.state.piaAddress : 'http://'+this.state.piaAddress,
          piaIdentifier: this.state.piaIdentifier,
          piaSecret: this.state.piaSecret
        }
      });
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //resizeMode: 'cover',
    width: null,
    height: null,
  },
  main: {
      flex: 1,
      flexDirection: 'row'
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  form: {
      width: 250,
      backgroundColor:'rgba(255,255,255,0.5)',
      borderRadius: 3,
      paddingBottom: 20,
  },
  description: {
    color: 'gray',
    textAlign: 'center'
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
  },
  configure: {
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


export default PiaConfigurationView
