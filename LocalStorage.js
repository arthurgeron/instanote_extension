import {AsyncStorage} from 'react-native';

export default class Storage {
  static isWeb = () => !!window.localStorage;

  static storage = Storage.isWeb() ? localStorage : AsyncStorage;
  static setItem = (key, object) => {
    if (Storage.isWeb()){
      Storage.storage.saveItem(key.toString(), object.toString());
    } else {
      Storage.storage.setItem(key.toString(), object.toString());
    }
  };
  static getItem = async (key, callback, passKeyOnCallBack = false) => {
    if (Storage.isWeb()) {
      if (passKeyOnCallBack) {
        let result = await Storage.storage.getItem(key.toString());
        if(!!callback)
          callback(key, result);
        return result
      } else {
        if(!!callback)
          callback(result);
        return result;
      }
    } else {
      if (!!callback) {
        return await Storage.storage.getItem(key.toString());
      } else {
        return await Storage.storage.getItem(key.toString(), callback);
      }
    }
  };

}

