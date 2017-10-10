/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Loginscreen from './Loginscreen';
import logo from './logo.svg';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
export default class InstaNoteMobile extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen key={'loginscreen5'} parentContext={this}/>);
    this.setState({
      loginPage:loginPage
    })
  }
  render() {
    return (
      <View className="App">
        <View>
          {this.state.loginPage}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
 // AppRegistry.registerComponent('InstaNoteMobile', () => InstaNoteMobile);
//This is what you pasted, code to start application in case of web
if (window.document) {
  AppRegistry.runApplication('InstaNoteMobile', {
    initialProps: {},
    rootTag: document.getElementById('react-root')
  });
}