import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Chat from './components/Chat';
import Countdown from './components/Countdown';

const RootNavigator = StackNavigator({
    Main: {
        screen: Home,
        navigationOptions: {
          headerTitle: 'Mixer Fixer',
        }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        headerTitle: 'Are We Ready?'
      }
    },
    Countdown: {
      screen: Countdown,
      navigationOptions: {
        headerTitle: 'Timer Has Started!'
      }
    }
});

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}
