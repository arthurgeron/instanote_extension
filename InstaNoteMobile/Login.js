import React, { Component } from 'react';
import Storage from './LocalStorage';
import axios from 'axios';
import { TextInput, Button, View } from 'react-native';
import 'core-js/es6/map';
import 'core-js/es6/set';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};
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
      <View>
        <ThemeProvider uiTheme={uiTheme}>
          <View>
            <TextInput
              placeholder='Enter your Username'
              floatingLabelText='Username'
              onChangeText = {(newValue) => this.setState({username:newValue})}
            />
            <TextInput
              type='password'
              placeholder='Enter your Password'
              floatingLabelText='Password'
              secureTextEntry={true}
              onChangeText = {(newValue) => this.setState({password:newValue})}
            />
            <Button title='Submit' primary={true} style={style} onPress={(event) => this.handleClick(event)}/>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}
const style = {
  margin: 15,
};

export default Login;