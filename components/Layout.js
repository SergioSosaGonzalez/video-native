import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Layout = ({video, loader, loading, controls, isShowControls}) => {
  return (
    <View style={styles.container}>
      <View style={styles.video}>{video}</View>
      <View style={styles.overlay}>{loading && loader}</View>
      {isShowControls && controls}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '56.25%',
  },
  video: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Layout;
