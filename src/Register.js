import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import 'core-js/es6/map';
import 'core-js/es6/set';
import Login from './Login';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      username:'',
      password:''
    }
  }
  handleClick(event){
    var apiBaseUrl = "http://where.dog";
    console.log("values",this.state.username,this.state.firstname,this.state.lastname,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
      "username": this.state.username,
      "firstname": this.state.first_name,
      "lastname":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'/user', payload)
      .then(function (response) {
        console.log(response);
        if(response.status === 200){
          console.log("registration successfull");
          var loginscreen=[];
          loginscreen.push(<Login key={'login2'} parentContext={this}/>);
          var loginmessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({loginscreen:loginscreen,
            loginmessage:loginmessage,
            buttonLabel:"Register",
            isLogin:true
          });
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
              title="Register"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              type = "password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default Register;