import React from 'react';
import { View, Switch } from 'react-native';

const OneSwitch = (props) => {
  return (
    <View>
      <Switch
        onValueChange={() => props.toggleSwitch(props.id)}
        value={props.switchValue}
        onTintColor="#CE1D25"
        tintColor="#43484D"
      />
    </View>
   );
};

export default OneSwitch;
