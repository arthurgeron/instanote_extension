import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import Sync from './Sync';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
      loginscreen: [],
      loginmessage: '',
      buttonLabel: 'Register',
      isLogin: !localStorage.getItem("userData"),
      isLogged: !!localStorage.getItem("userData"),
      userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {}
    }
  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.state.isLogin && !this.state.isLogged){
      let loginscreen=[];
      loginscreen.push(<Register parentContext={this}/>);
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
      loginscreen.push(<Login parentContext={this}/>);
      loginmessage = "Not Registered yet.Go to registration";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
      })
    } else {
      let loginscreen=[]
      loginscreen.push(<Sync data={this.state.userData}/>);
      loginmessage = "Welcome " +this.state.userData.username+"!";
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
        isLogged: true
      });
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage
    });
    if (this.state.isLogged) {
      this.handleClick();
    }
  }
  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
              <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;