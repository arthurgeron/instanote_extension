import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



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
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
      loginPage:loginPage
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Insta Note</h1>
        </header>
        <div className="App">
          {this.state.loginPage}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
