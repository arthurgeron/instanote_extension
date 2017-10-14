import React, { Component } from 'react';
import Storage from './LocalStorage';
import axios from 'axios';
import { TextInput, Button, View } from 'react-native';
import 'core-js/es6/map';
import 'core-js/es6/set';
import { ThemeProvider } from 'react-native-material-ui';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }
  handleClick(event){
    var apiBaseUrl = "https://where.dog";
    var self = this;
    axios.post(apiBaseUrl+'/login?user='+this.state.username+'&password='+this.state.password)
      .then(function (response) {
        console.log(response);
        if(response.status === 200) {
          console.log("Login successfull");
          Storage.setItem("userData", JSON.stringify(response.data));
          self.props.parentContext.setState({
            isLogged:true,
            userData: response.data,
            isLogin:false
          });
          self.props.parentContext.handleClick();
        }
        else if(response.status === 400) {
          console.log("Username password do not match");
          alert("username password do not match")
        }
        else{
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View >
        <ThemeProvider uiTheme={Styles.uiTheme}>
          <View style={Styles.login.view}>
            <View style={Styles.login.innerView}>
            <TextInput
              style={Styles.login.loginText}
              placeholder='Enter your Username'
              floatingLabelText='Username'
              onChangeText = {(newValue) => this.setState({username:newValue})}
            />
            </View>
            <View style={Styles.login.innerView}>
            <TextInput
              style={Styles.login.passwordText}
              type='password'
              placeholder='Enter your Password'
              floatingLabelText='Password'
              secureTextEntry={true}
              onChangeText = {(newValue) => this.setState({password:newValue})}
            />
            </View>
            <View style={Styles.login.innerView}>
            <Button title='Submit' primary={true} onPress={(event) => this.handleClick(event)}/>
            </View>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}


let Styles = require('./INStyle');
const style = {
  margin: 15,
};

export default Login;