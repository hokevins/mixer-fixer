import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

window.navigator.userAgent = 'react-native';
// import openSocket from 'socket.io-client/dist/socket.io';

import openSocket from 'socket.io-client';
const socket = openSocket('localhost:1337', {jsonp: false});

import OneSwitch from './OneSwitch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white'
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
      teams: [],
      name: 'Bob'
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch(value) {
    this.setState({
      ready: value
    });
    this.props.navigation.navigate('Countdown');
    this.setState({ready: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <View style={{flexDirection: 'row', padding: 20}}>
          <OneSwitch
            toggleSwitch={this.handleSwitch}
            switchValue={this.state.ready}
          />
          {/*
            socket.on('update', () => {
              console.log('!!!!!!!!!!!!');
              this.setState({name: 'Nate'});
            });
          */}
          <Text style={styles.text}>Is Team {this.props.navigation.state.params.name} ready?</Text>
        </View>
      </View>
    );
  }
}
