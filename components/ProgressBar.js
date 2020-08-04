import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Slider,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
} from 'react-native';

const ProgressBar = (props) => {
  return (
    <View style={styles.progress}>
      <Slider
        maximumValue={props.duration}
        minimumValue={0}
        onValueChange={props.onChangeStarted}
        onSlidingComplete={props.onChangeFinished}
        style={styles.slider}
        value={props.progress}
        // step={duration / 10000}
        maximumTrackTintColor="rgba(255, 255, 255, .40)"
        minimumTrackTintColor="#0096ff"
        thumbTintColor="white"
      />
    </View>
  );
  /*return Platform.select({
    ios: (
      <ProgressViewIOS
        style={styles.progressBarIos}
        progressTintColor="#E82943"
        trackTintColor="light-gray"
        progress={props.progress}
      />
    ),
    android: (
      <ProgressBarAndroid
        color="#E82943"
        indeterminate={false}
        styleAttr="Horizontal"
        style={styles.progressBarAndroid}
        progress={props.progress}
      />
    ),
  });*/
};
const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    width: '114%',
    top: -10,
    left: -13,
  },
  progressBarAndroid: {
    width: 240,
  },
  progressBarIos: {
    width: 200,
  },
});
export default ProgressBar;
