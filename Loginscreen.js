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
      loginscreen: [],
      loginmessage: '',
      buttonLabel: 'Register'
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
    var loginmessage;
    if(this.state.isLogin && !this.state.isLogged){
      let loginscreen=[];
      loginscreen.push(<Register key={'register'} parentContext={this}/>);
      loginmessage = "Already registered.Go to Login";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Login",
        isLogin:false
      })
    }
    else if (!this.state.isLogged){
      let loginscreen=[];
      loginscreen.push(<Login key={'login'} parentContext={this}/>);
      loginmessage = "Not Registered yet.Go to registration";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
      })
    } else {
      let loginscreen=[]
      loginscreen.push(<Sync key={'sync'} data={this.state.userData}/>);
      loginmessage = "Welcome " +this.state.userData.username+"!";
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
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
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage
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
    var styleS = {backgroundColor: color};
    return (
      <Animated.View className="loginscreen" style={styleS}>
        {this.state.loginscreen}
        <View >
          <Text>
            {this.state.loginmessage}
          </Text>
          <ThemeProvider uiTheme={Styles.uiTheme}>
            <View >
              <Button title={this.state.buttonLabel.toString()} primary={true} style={style} onPress={(event) => this.handleClick(event)}/>
            </View>
          </ThemeProvider>
        </View>
      </Animated.View>
    );
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;