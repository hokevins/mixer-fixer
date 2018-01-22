import React from 'react';
import { View, Image } from 'react-native';

import TimerCountdown from 'react-native-timer-countdown';

const Countdown = (props) => {
   return (
        <View style={{flex: 1}}>
          <TimerCountdown
              initialSecondsRemaining={1000 * 5}
              onTick={() => console.log('tick')}
              onTimeElapsed={() => props.navigation.goBack()}
              allowFontScaling={true}
              style={{
                fontSize: 100,
                flexDirection: 'column',
                alignSelf: 'center',
                padding: 20,
                color: '#CE1D25'
              }}
          />
          <Image
            style={{
              alignSelf: 'center',
              marginBottom: 500
            }}
            source={require('../assets/fullstackLogo.png')}
          />
        </View>
    );
};

export default Countdown;
