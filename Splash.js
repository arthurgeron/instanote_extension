import React, { Component } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
class Splash extends Component {
  constructor (props) {
    super(props);
    this.animationValue = new Animated.Value(0);
  }
  componentWillMount () {
    let self = this;
    setTimeout (() => {
      //self.props.parentContext.setState({splash: false});
    }, 2000);
  }
  rotateImage() {
    this.animationValue.setValue(0);
    Animated.timing(
      this.animationValue,
      {
        toValue: 1,
        duration:3000,
        easing: Easing.linear
      }
    ).start(() => this.rotateImage())
  }
  render () {
    const spin = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View>
        <Animated.Image style={{
          left: '25%',
          top: '80%',
          alignContent: 'center',
          justifyContent: 'center',
          transform: [{rotate: spin}]
        }} source={require('./android/app/src/main/res/mipmap-xxxhdpi/instanote.png')}/>
      </View>
    );
  }
}


module.exports = Splash;