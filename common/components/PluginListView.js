import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ListView,Linking, StyleSheet,Text, TouchableHighlight,View } from 'react-native';

class PluginListView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: true
        };
        AsyncStorage.getItem('configuration', (err, result) => {
            if (result) {
                var piaAddress = JSON.parse(result).piaAddress;

                AsyncStorage.getItem('token', (err, result) => {
                    if (result) {
                        var json = JSON.parse(result);

                        var headers = new Headers();
                        headers.append("Authorization", "Bearer " + json.access_token);
                        headers.append("Accept", "application/json");

                        fetch(piaAddress+'/api/plugins', {
                            method: 'GET',
                            headers: headers
                        })
                        .then((response) => response.text())
                        .then((responseText) => {
                            this.setState({
                                loading: false,
                                dataSource: ds.cloneWithRows(JSON.parse(responseText))
                            });
                        })
                        .catch((error) => {
                            console.warn(error);
                        });
                    }
                });
            }
        });
    }

    rowPressed(plugin) {
        if (plugin.url) {
            Linking.openURL(plugin.url);
        }
    }

    renderRow(pluginData, sectionID, rowID) {
        console.log(pluginData);
        return (
            <TouchableHighlight onPress={() => this.rowPressed(pluginData)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View  style={styles.textContainer}>
                            <Text style={styles.title}>{pluginData.name}</Text>
                            <Text style={styles.identifier}
                                  numberOfLines={1}>{pluginData.identifier}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        var view;
        if(this.state.loading) {
            view = <Text>Lade...</Text>
        } else {
            view =  <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
        }

        return (
            <View style={{paddingTop: 22}}>
                {view}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4475b8'
    },
    identifier: {
        fontSize: 18,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#e0e6ee'
    }
});

export default PluginListView
