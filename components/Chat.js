import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import OneSwitch from './OneSwitch';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
const socketUrl = 'http://192.168.0.2:1337';
import { USER_CONNECTED } from '../Events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  userList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20
  },
  text: {
    fontSize: 20,
    padding: 10
  },
  inputText: {
      height: 40,
      width: 250,
      margin: 5,
      textAlign: 'center',
      color: '#e8eef2',
      backgroundColor: '#43484D'
  },
  button: {
    padding: 20,
    color: '#CE1D25'
  }
});

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      ready: false,
      connectedUsers: {},
      everyoneReady: [],
      activeSwitch: null,
      socket: null
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.initSocket = this.initSocket.bind(this);
  }

  componentWillMount(){
    this.initSocket();
  }

  initSocket() {
    const socket = io(socketUrl);
    socket.on(USER_CONNECTED, (connectedUsers) => {
      const oldEveryoneReady = this.state.everyoneReady;
      oldEveryoneReady.push(false);
      this.setState({everyoneReady: oldEveryoneReady});
      this.setState({connectedUsers});
    });
    this.setState({socket});
  }

  handleSwitch(value) {
    // const oldReady = this.state.everyoneReady;
    // for (let i = 0; i < oldReady.length; i++) {
    //   if (oldReady[i] === false) {
    //     oldReady[i] = true;
    //     this.setState({everyoneReady: oldReady})
    //     console.log('???????', this.state.everyoneReady)
    //   }
    // }
    // if (oldReady[oldReady.length - 1] === true) {
      // this.props.navigation.navigate('Countdown');
      // this.setState({ready: false});
    // }
    // const socket = io(socketUrl);
    // socket.emit('ready', index);
    this.setState({
      ready: value
    });
    // this.props.navigation.navigate('Countdown');
    // this.setState({ready: false});
  }

  toggleSwitch = (switchNumber) => {
    this.setState({
      activeSwitch: switchNumber === this.state.activeSwitch ? null : switchNumber
    });
  };

  switchOne = (index) => { this.toggleSwitch(index)};
  switchTwo = (value) => { this.toggleSwitch(2)};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userList}>
          {
            Object.keys(this.state.connectedUsers)
          .map((user, index) => (<View key={index}>
            <OneSwitch
              toggleSwitch={(index) => this.switchOne(index)}
              switchValue={this.state.activeSwitch === index}
            />
            <Text style={styles.text}>Is Team {user} ready?</Text>
          </View>
          ))}
        </View>
      </View>
    );
  }
}
