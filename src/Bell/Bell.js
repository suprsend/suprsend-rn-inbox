import React from 'react';
import { Image } from 'react-native';

function Bell({ bellComponent, ...otherProps }) {
  if (bellComponent) {
    const BellComponent = bellComponent;
    return <BellComponent {...otherProps} />;
  }
  return <Image source={require('./DefaultBellIcon.png')} />;
}

export default Bell;
