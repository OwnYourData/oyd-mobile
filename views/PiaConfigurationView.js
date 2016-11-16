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
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({
            visibleHeight: newSize,
            topLogo: {width: 100, height: 100}
        })
    }

    keyboardDidHide (e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            visibleHeight: Dimensions.get('window').height,
            topLogo: {width: Dimensions.get('window').width}
        });
    }
    render() {
    return (
      <Image source={require('./../login_background.png')} style={styles.background}>
          <View style={ [styles.container, {height: this.state.visibleHeight}] }>
             <Image source={require('./../logo.png')} style={[styles.logo, this.state.topLogo]}/>

            <View style={styles.form}>
            <Button style={styles.scan} onPress={this.onPressQRCode.bind(this)}>
                QR Code scannen
            </Button>
            <Text style={styles.description}>oder selbst eingeben</Text>
               <Input ref="piaAddress" placeholder="Adresse des Datentresors" value={this.state.piaAddress} onChangeText={(text) => {this.setState({piaAddress: text})}}/>
               <Input ref="piaIdentifier" placeholder="Kennung (Identifier)"  value={this.state.piaIdentifier} onChangeText={(text) => {this.setState({piaIdentifier: text})}}/>
               <Input ref="piaSecret" placeholder="Passwort (Secret)" value={this.state.piaSecret} secret={true} onChangeText={(text) => {this.setState({piaSecret: text})}}/>
            </View>

            <View style={styles.quarterHeight}>
             <Button style={styles.configure} onPress={this.onConfigure.bind(this)}>
                 Weiter
             </Button>
            </View>
        </View>
      </Image>
    );
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
   this.setState({piaAddress: json.host, piaIdentifier: json.id, piaSecret: json.secret});
 }

  onConfigure() {
      this.props.navigator.push({
        id: 'login',
        passProps: {
          piaAddress: this.state.piaAddress.replace(/^https?:\/\//, ""),
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
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
  },
  logo: {
    height: 300,
    width: 300,
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
  },
  quarterHeight: {
      flex: .25,
      backgroundColor: 'transparent',
      alignItems: 'stretch',
  },
});


export default PiaConfigurationView
