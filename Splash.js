import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
class Splash extends Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    let self = this;
    setTimeout (() => {
      self.props.parentContext.setState({splash: false});
    }, 2000);
  }
  render () {
    return (
      <View>
        <Image style={{
          left: '25%',
          top: '80%',
          alignContent: 'center',
          justifyContent: 'center'
        }} source={require('./android/app/src/main/res/mipmap-xxxhdpi/instanote.png')}/>
      </View>
    );
  }
}


module.exports = Splash;