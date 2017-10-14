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
      <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{
  position: 'absolute',
  left: 0,
  top: 0,
  width: windowSize.width,
  height: windowSize.height
}} source={{uri: 'instanote'}}/>
      </View>
    );
  }
}


module.exports = Splash;