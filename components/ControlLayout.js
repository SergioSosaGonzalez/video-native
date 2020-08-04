import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
const ControlLayout = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 35,
    flexDirection: 'row',
    paddingHorizontal: 10,
    zIndex: 1,
    alignItems: 'center',
  },
});
export default ControlLayout;
