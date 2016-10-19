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
        borderColor: 'gray',
        padding: 0,
        margin: 0,
    },
    text: {
        width: 200,
        alignSelf: 'center'
    }
});

Input.defaultProps = { placeholder: "username", secret: false};

export default Input;
