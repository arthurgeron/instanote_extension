import { AppRegistry } from 'react-native';
import App from './App';

global.isNative = true;
AppRegistry.registerComponent('InstaNoteMobile', () => App);
