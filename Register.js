import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import axios from 'axios';
import { TextInput, Button, View, Text } from 'react-native';
import 'core-js/es6/map';
import 'core-js/es6/set';
import Login from './Login';
import PopupDialog, { DialogTitle, SlideAnimation } from 'react-native-popup-dialog';

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
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      username:'',
      password:'',
      popupDialog: undefined,
      alertTitle: 'Failed!!',
      alertMessage: 'We could not create your user!\nIf this issue persists, please contact us.'
    }
  }
  handleClick(event){
    let apiBaseUrl = "http://where.dog";
    console.log("values",this.state.username,this.state.firstname,this.state.lastname,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    let self = this;
    let payload={
      "username": this.state.username,
      "firstname": this.state.first_name,
      "lastname":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    };
    axios.post(apiBaseUrl+'/user', payload)
      .then(function (response) {
        console.log(response);
        if(response.status === 200){
          console.log("registration successfull");
          var loginscreen=[];
          loginscreen.push(<Login key={'login2'} parentContext={this}/>);
          var loginmessage = "";
          this.setState({
            alertTitle:'Success!',
            alertMessage:'User Created With Success!! You can now login and start noting!'
          });
          self.props.parentContext.setState({loginscreen:loginscreen,
            loginmessage:loginmessage,
            buttonLabel:"Register",
            isLogin:true
          });
        }
        self.popupDialog.show();
      })
      .catch(function (error) {
        console.log(error);
        self.popupDialog.show();
      });

  }
  render() {
    return (
      <View >
        <ThemeProvider uiTheme={uiTheme} style={{elevation:0}}>
          <View style={{elevation:0}}>
            <TextInput
              required
              maxLength={50}
              pattern={'[A-Za-z0-9]{1,50}'}
              placeholder="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <TextInput
              required
              maxLength={50}
              placeholder="Enter your First Name"
              floatingLabelText="First Name"
              onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
            <TextInput
              required
              maxLength={50}
              placeholder="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
            <TextInput
              required
              maxLength={100}
              placeholder="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <TextInput
              required
              maxLength={30}
              type = "password"
              placeholder="Enter your Password"
              secureTextEntry={true}
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              style={{elevation:0}}
            />
            <Button title="Submit" primary={true} style={style} onPress={(event) => this.handleClick(event)}/>
          </View>
        </ThemeProvider>
        <View>
          <PopupDialog
            dialogTitle={<DialogTitle title={this.state.alertTitle} />}
            ref={(popupDialog,self = this) => { self.popupDialog = popupDialog; }}
            dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
          >
            <View>
              <Text>
                {this.state.alertMessage}
              </Text>
            </View>
          </PopupDialog>
        </View>
      </View>
    );
  }
}
const style = {
  margin: 15,
};

export default Register;