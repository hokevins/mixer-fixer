import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Chat from './components/Chat';
import Countdown from './components/Countdown';
// import Timer from './components/Timer';
// import Timeup from './components/Timeup';

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
        headerTitle: '3...2...1!'
      }
    },
    Countdown: {
      screen: Countdown,
      navigationOptions: {
        headerTitle: 'You got this.'
      }
    }
    // Timer: {
    //   screen: Timer,
    //   navigationOptions: {
    //     headerTitle: 'Timer'
    //   }
    // },
    // Timeup: {
    //   screen: Timeup,
    //   navigationOptions: {
    //     headerTitle: 'Time\'s Up!'
    //   }
    // }
});

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}
