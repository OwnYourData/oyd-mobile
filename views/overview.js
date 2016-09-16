/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PluginListView from './../common/components/PluginListView';

class Overview extends Component {
  render() {
    return (
      <View style={styles.container}>

          <PluginListView/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});


export default Overview
