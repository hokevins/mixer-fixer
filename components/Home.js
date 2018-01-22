import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
const socketUrl = 'http://192.168.0.2:1337';
import { USER_CONNECTED, VERIFY_USER } from '../Events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text1: {
    fontSize: 20,
    padding: 5
  },
  text2: {
    fontSize: 20,
    padding: 5
  },
  text3: {
    fontSize: 20,
    padding: 5,
    color: 'purple',
    fontStyle: 'italic'
  },
  inputText: {
      height: 40,
      width: 250,
      margin: 5,
      textAlign: 'center',
      color: '#E8EEF2',
      backgroundColor: '#43484D'
  },
  button: {
    padding: 20,
    color: '#CE1D25'
  }
});

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket: null,
      user: null,
      name: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentWillMount(){
    this.initSocket();
  }

  initSocket() {
    const socket = io(socketUrl);
    socket.on('update', () => {
      if (!this.state.error) {
        this.setState({error: 'TEST EMIT ERROR MESSAGE'});
      } else {
        this.setState({error: ''});
      }
    });
    this.setState({socket});
  }

  handleChange(name) {
    this.setState({name});
  }

  handleSubmit() {
    const socket = this.state.socket;
    const name = this.state.name;
    socket.emit(VERIFY_USER, name, this.setUser);
    this.props.navigation.navigate('Chat');
  }
// Future implementation:  fix duplicate user render error problem on Line: 89 and moving Line 84 navigation down to the setUser else block without render delay bug.
  setUser(user) {
    if (user.isUser) {
      this.setState({ error: 'Name already taken.' });
    } else {
      const { socket } = this.state;
      socket.emit(USER_CONNECTED, user);
      this.setState({user});
      this.setState({ error: '' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>Welcome to your Fullstack Mixer Fixer!</Text>
        <Image
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: undefined,
            height: undefined,
            margin: 5
          }}
          source={require('../assets/fullstackLogo2.png')}
        />
        <Text style={styles.text2}>Are you READY to</Text>
        <Text style={styles.text2}>...get SET</Text>
        <Text style={styles.text2}>...and GO?</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor= "#FFFFFF"
          onChangeText={(name) => this.handleChange(name)}
          value={this.state.name}
          placeholder="Enter Fellow Name"
        />
        <Button
          style={styles.button}
          onPress={this.handleSubmit}
          title="BEGIN"
          color="#CE1D25"
        />
        <Text style={styles.text3}>{this.state.error ?
          this.state.error : null}
        </Text>
      </View>
    );
  }
}
