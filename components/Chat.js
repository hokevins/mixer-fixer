// FIX IP ADDRESS IN ONE PLACE AND UPDATE AS NODE ENV VARIABLE
  // ADD NOTE TO README.MD TO CHANGE IP ADDRESS TO MAKE IT WORK!
  // add next iteration features to develop in AGILE?, mention that it's an MVP?
// FIX SWITCHES AND EMIT DIFFERENT ONES TURNED ON WITH CASSIO'S FIX
// CALCULATE ALL SWITCHES ON AND EMIT READY FOR TIMER

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import OneSwitch from './OneSwitch';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
const socketUrl = 'http://172.16.21.157:1337';
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
      socket: null,
      connectedUsers: {},
      ready: false,
      everyoneReady: [],
      switchValues: {},
      activeSwitch: null
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
    socket.on('READY', () => {
      this.props.navigation.navigate('Countdown');
      this.setState({ready: false});
    });
    this.setState({socket});
  }

// Future implementation:  Start timer only when all teams are ready, account for individual switch options (turning on only 1 switch at a time).
  handleSwitch(id) {
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
    const isOn = this.state.switchValues[id];
    this.setState({switchValues: {[id]: !isOn}});
    // const socket = io(socketUrl);
    // socket.emit('READY');
  }

  toggleSwitch = (id) => {

    this.setState({
      activeSwitch: switchNumber === this.state.activeSwitch ? null : switchNumber
    });

  };

  switchOne = (value) => { this.toggleSwitch(1)};
  switchTwo = (value) => { this.toggleSwitch(2)};
// example to use:
// <Switch
//   onValueChange={this.switchTwo}
//   value={this.state.activeSwitch === 2}
// />

  render() {
    const {connectedUsers} = this.state
    console.log('??????????', this.state.switchValues)
    return (
      <View style={styles.container}>
        <View style={styles.userList}>
          {
            Object.keys(this.state.connectedUsers)
          .map((user, index) => (<View key={index}>
            <OneSwitch
              id={this.state.connectedUsers[user].user.id}
              toggleSwitch={this.handleSwitch}
              switchValue={this.state.switchValues[this.state.connectedUsers[user].user.id]}
            />
            <Text style={styles.text}>Is Team {user} ready?</Text>
          </View>
          ))}
        </View>
      </View>
    );
  }
}
