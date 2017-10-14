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
    View
  } from 'react-native';
import Splash from './Splash';

export default class InstaNoteMobile extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      splashScreen:[],
      splash: true
    }
  }
  componentWillMount(){
    let loginPage =[];
    let splashScreen = [];
    loginPage.push(<Loginscreen key={'loginscreen5'} parentContext={this}/>);
    splashScreen.push(<Splash key={'splashScreen'} parentContext={this}/>);
    this.setState({
      loginPage: loginPage,
      splashScreen: splashScreen
    })
  }
  render() {
    return (

      <View className="App">
        <View>
          {this.state.splash ? this.state.splashScreen : this.state.loginPage}
        </View>
      </View>
    );
  }
}
//This is what you pasted, code to start application in case of web
if (window.document) {
  AppRegistry.runApplication('InstaNoteMobile', {
    initialProps: {},
    rootTag: document.getElementById('react-root')
  });
}