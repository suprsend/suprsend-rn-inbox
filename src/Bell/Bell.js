import React from 'react';
import { Image, StyleSheet } from 'react-native';

function Bell({ bellComponent, ...otherProps }) {
  if (bellComponent) {
    const BellComponent = bellComponent;
    return <BellComponent {...otherProps} />;
  }
  return (
    <Image source={require('./DefaultBellIcon.png')} style={styles.icon} />
  );
}

const styles = StyleSheet.create({ icon: { height: 20, width: 20 } });

export default Bell;
