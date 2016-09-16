import React, { Component } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  View
} from 'react-native';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.text}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={this.props.placeholder}
            secureTextEntry={this.props.secret}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
          />
        </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: .5,
        padding: 10,
        margin: 10,
    },
    text: {
        width: 200,
        height: 20,
        alignSelf: 'center'
    }
});

Input.defaultProps = { placeholder: "username", secret: false};

export default Input;
