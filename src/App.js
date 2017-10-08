import React, { Component } from 'react';
import logo from './logo.svg';
import 'core-js/es6/map';
import 'core-js/es6/set';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen key={'loginscreen5'} parentContext={this}/>);
    this.setState({
      loginPage:loginPage
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          {this.state.loginPage}
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Insta Note</h1>
        </header>
      </div>
    );
  }
}

export default App;
