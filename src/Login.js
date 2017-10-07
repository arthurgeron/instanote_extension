import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }
  handleClick(event){
    var apiBaseUrl = "http://where.dog";
    var self = this;
    axios.post(apiBaseUrl+'/login?user='+this.state.username+'&password='+this.state.password)
      .then(function (response) {
        console.log(response);
        if(response.status === 200) {
          console.log("Login successfull");
          localStorage.setItem("userData", JSON.stringify(response.data));
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
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title='Login'
            />
            <TextField
              hintText='Enter your Username'
              floatingLabelText='Username'
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br />
            <TextField
              type='password'
              hintText='Enter your Password'
              floatingLabelText='Password'
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label='Submit' primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default Login;