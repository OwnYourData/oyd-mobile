import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Slider,
  DatePickerIOS,
  Picker,
  PickerIOS,
  Switch,
  Vibration,
  View
} from 'react-native';

import Camera from 'react-native-camera';

class QRCodeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    this.barCodeFlag = true;
    return (
      <Camera captureAudio={false} onBarCodeRead={this.onBarCodeRead.bind(this)} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
      </Camera>
    )
  }

  onBarCodeRead(result) {
    if (this.barCodeFlag) {
      this.barCodeFlag = false;
      var $this = this;
      Vibration.vibrate();
      setTimeout(function() {
        $this.props.navigator.pop();
        $this.props.onSucess(result.data);
      }, 1000);
    }
    //this.props.onSucess(result.data);
    /*
    this.props.navigator.pop();

  if (this.barCodeFlag) {
    this.barCodeFlag = false;
    var $this = this;
    setTimeout(function() {
      VibrationIOS.vibrate();
      $this.props.navigator.pop();
      $this.props.onSucess(result.data);
    }, 1000);
  }
  */
  }

}



const styles = StyleSheet.create({
  camera: {
    height: 568,
    alignItems: 'center',
    backgroundColor: 'red'
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  }
});


export default QRCodeScreen;
