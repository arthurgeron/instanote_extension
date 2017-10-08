import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Axios from 'axios';
import 'core-js/es6/map';
import 'core-js/es6/set';
import qs from 'qs';

class Sync extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData: this.props.data,
      displayUserData: [],
      apiBaseUrl: "http://localhost:8080",
      inputValue: !!localStorage.getItem("text") ? localStorage.getItem("text") : '' ,
      lastUpdated: !!localStorage.getItem("lastUpdated") ? localStorage.getItem("lastUpdated") : '01/01/2000 00:00:00'
    }
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
          localStorage.setItem("lastUpdated", self.getCurrentDateTime());
          localStorage.setItem("text", self.state.text);
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
          localStorage.setItem("text", text);
          localStorage.setItem("lastUpdated", date);
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
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title='Insta Note :-)'
            />
            <br/>
          </div>
        </MuiThemeProvider>
        <div className="sync">
          <MuiThemeProvider>
            <TextField
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
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Sync;