import { COLOR, ThemeProvider } from 'react-native-material-ui';
import React, { Component } from 'react';
import Axios from 'axios';
import { TextInput, View } from 'react-native';
import 'core-js/es6/map';
import Storage from './LocalStorage';
import 'core-js/es6/set';
import qs from 'qs';

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
class Sync extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData: this.props.data,
      displayUserData: [],
      apiBaseUrl: "http://where.dog"
    };
    this.updateText();
  }
  updateInputValue (el) {
    this.setState({
      inputValue: el.target.value,
      lastUpdated: this.getCurrentDateTime()
    });
  }
  getCurrentDateTime() {
    let today = new Date();
    today = new Date(today.valueOf() + (today.getTimezoneOffset() - 180) * 60000); // GMT -03:00
    let dd = today.getDate();
    let MM = today.getMonth()+1; //January is 0!
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();

    let yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(MM<10){
      MM='0'+MM;
    }
    return dd+'/'+MM+'/'+yyyy+' '+ hh +':'+ mm + ':' + ss;
  }
  getPayload(method) {
    return {
      "id": this.state.userData.id,
      "text": (method === 'post' ? this.state.inputValue : ""),
      "date": (method === 'post' || method === 'put' ? this.state.lastUpdated : ""),
      "auth-token":this.state.userData["auth-token"]
    }
  }
  sendText() {
    let self = this;
    return Axios.post(this.state.apiBaseUrl+'/user/text', this.getPayload('post'))
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          console.log("update text successfull");
          Storage.setItem("lastUpdated", self.getCurrentDateTime());
          Storage.setItem("text", self.state.text);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getText() {
    return Axios.get(this.state.apiBaseUrl+'/user/text', {
      'params': this.getPayload('get'),
      'paramsSerializer': function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    })
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          console.log("get text successfull");
          let text = response.data.text;
          let date = response.data.date;
          this.setState({
            inputValue: text,
            lastUpdated: date
          })
          Storage.setItem("text", text);
          Storage.setItem("lastUpdated", date);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  updateText(){
    let self = this;
    Axios.put(this.state.apiBaseUrl+'/user/text', this.getPayload('put'))
      .then(function (response) {
        console.log(response);
        if(response.status === 200){
          console.log("get text successfull");
          if(response.data.action === 'Send') {
            self.sendText().then(() => setTimeout(() => self.updateText(), 1000));
          } else if (response.data.action === 'Receive') {
            self.getText().then(() => setTimeout(() => self.updateText(), 1000));
          } else {
            setTimeout(() => self.updateText(), 1000);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    let userData = [];
    Storage.getItem("text").then((result) => {this.setState({inputValue: (!!result ? result : '')});});
    Storage.getItem("lastUpdated").then((result) => {this.setState({lastUpdated: (!!result ? result : '01/01/2000 00:00:00')});});
    for (let key of Object.keys(this.state.userData)) {
      if(!!this.state.userData[key]) {
        userData.push([<span key={key}>{key}: {this.state.userData[key]}</span>,<br key={key + 'br'}/>]);
      }
    }
    this.setState({
      displayUserData: userData
      }
    );
  }
  render() {
    return (
      <View>
        <ThemeProvider uiTheme={uiTheme}>
          <View>
          </View>
        </ThemeProvider>
        <View className="sync">
          <ThemeProvider uiTheme={uiTheme}>
            <TextInput
              size={10000}
              maxLength={10000}
              type='text'
              hintText='Type as much as you want ;-)'
              rowsMax={1000}
              fullWidth={true}
              multiLine={true}
              floatingLabelText='Anything you need to note down?'
              defaultValue={this.state.inputValue}
              onChange={el => this.updateInputValue(el)}
              value={this.state.inputValue}
            />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

export default Sync;