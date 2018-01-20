import React, { Component } from 'react';
import { View, Switch } from 'react-native';

export default OneSwitch = (props) => {
  return (
    <View>
      <Switch
        onValueChange={props.toggleSwitch}
        value={props.switchValue}
        onTintColor="#CE1D25"
        tintColor="#43484D"
      />
    </View>
   );
};