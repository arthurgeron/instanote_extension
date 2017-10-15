import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import Login from './Login';
import { Animated, Easing, Button, View, Text } from 'react-native';
import Register from './Register';
import Sync from './Sync';
import Storage from './LocalStorage';
import 'core-js/es6/map';
import 'core-js/es6/set';


let Styles = require('./INStyle');

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
      loginscreen: []
    };

    this.animationValue = new Animated.Value(0);
  }
  backgroundColor() {
    this.animationValue.setValue(0);
    Animated.timing(
      this.animationValue,
      {
        toValue: 150,
        duration:5000
      }
    ).start(() => {
      Animated.timing(
        this.animationValue,
        {
          toValue: 0,
          duration:5000
        }
      ).start(() => this.backgroundColor())
    })
  }
  handleClick(event){
    console.log("event",event);
    if(this.state.isLogin && !this.state.isLogged){
      let loginscreen=[];
      loginscreen.push(<Register key={'register'} parentContext={this}/>);
      this.setState({
        loginscreen:loginscreen,
        buttonLabel:"Login",
        isLogin:false
      })
    }
    else if (!this.state.isLogged){
      let loginscreen=[];
      loginscreen.push(<Login key={'login'} parentContext={this}/>);
      this.setState({
        loginscreen:loginscreen,
        buttonLabel:"Register",
        isLogin:true
      })
    } else {
      let loginscreen=[]
      loginscreen.push(<Sync key={'sync'} data={this.state.userData}/>);
      this.setState({
        loginscreen: loginscreen,
        isLogged: true
      });
    }
  }
  componentWillMount(){
    Storage.getItem("userData").then((result) => {this.setState({isLogin: !result});});
    Storage.getItem("userData").then((result) => {this.setState({isLogged: !!result});});
    Storage.getItem("userData").then((result) => {this.setState({userData: (result ? JSON.parse(result) : {})});});
    var loginscreen=[];
    loginscreen.push(<Login key={'login4'} parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({
      loginscreen:loginscreen
    });
    if (this.state.isLogged) {
      this.handleClick();
    }
  }
  componentDidMount() {
    this.backgroundColor();
  }
  render() {
    const color = this.animationValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(20, 100, 70)', 'rgb(51, 250, 170)']
    });
    var styleS = {backgroundColor: color, height:'100%'};
    return (
      <Animated.View className="loginscreen" style={styleS}>
        {this.state.loginscreen}
      </Animated.View>
    );
  }
}
export default Loginscreen;