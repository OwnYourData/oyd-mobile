import React, { Component } from 'react';
import { 
    AppRegistry, 
    AsyncStorage, 
    ListView,
    Linking, 
    StyleSheet,
    Text, 
    Image,
    TouchableHighlight,
    View 
} from 'react-native';

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
        if (plugin.mobileurl) {
            Linking.openURL(plugin.mobileurl);
        }
    }

    renderHeader(){
        return(
            <View>
                <Text style={styles.header}>Meine Apps</Text>
            </View>
        );
    }

    renderRow(pluginData, sectionID, rowID) {
        //console.log(pluginData);
        var app_pic = pluginData.picture;
        return (
            <TouchableHighlight onPress={() => this.rowPressed(pluginData)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View  style={styles.textContainer}>
                            <Text style={styles.titleContainer}>
                                <Image style={styles.pic} source={{uri: app_pic}}/>
                                <Text>   </Text>
                                <Text style={styles.title}>{pluginData.name}</Text>
                            </Text>
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
            view =  <ListView 
                        dataSource={this.state.dataSource} 
                        renderHeader={this.renderHeader.bind(this)}
                        renderRow={this.renderRow.bind(this)} 
                    />
        }

        return (
            <View style={{paddingTop: 22}}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    titleContainer: {

    },
    header: {
        fontSize: 20,
        padding: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#444444',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff',
    },
    pic: {
        width: 50, 
        height: 50,
    },
});

export default PluginListView
