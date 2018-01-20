import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

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
    padding: 8
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
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    this.setState({
      name
    });
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
          placeholder="Fellow Name"
        />
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name})}
          title="ENTER"
          color="#CE1D25"
        />
      </View>
    );
  }
}
