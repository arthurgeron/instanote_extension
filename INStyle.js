'use strict';
import { COLOR } from 'react-native-material-ui';
var React = require('react-native');
var {
  StyleSheet,
} = React;

module.exports =  {
  uiTheme: {
    palette: {
      primaryColor: COLOR.green500,
    },
    toolbar: {
      container: {
        height: 50,
      },
    }
  },
  login:{
    view: {
      flex: 0,
      marginTop: '20%',
      justifyContent: 'space-around',
      paddingTop:10,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
    },
    innerView: {
      height: 100
    },
    loginText: {
      fontSize: 16,
      textAlign: 'center'
    },
    passwordText: {
      fontSize:16,
      textAlign: 'center'
    }
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};