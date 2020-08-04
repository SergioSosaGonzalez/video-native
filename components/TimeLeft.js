import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

function TimeLeft(props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        height: '100%',
      }}>
      <Text style={styles.time}>
        {props.currentTime?.toString().replace('.', ':')} /
        {timeReadable(props.duration)}
      </Text>
    </View>
  );
}

function timeReadable(time) {
  let timeInMins = time / 60;
  let mins = Math.floor(timeInMins);
  let seconds = timeInMins % 1;
  seconds = (seconds * 60) / 1000;
  let timeReadable = (mins + seconds * 10)
    .toFixed(2)
    .toString()
    .replace('.', ':');
  return timeReadable;
}

const styles = StyleSheet.create({
  time: {
    color: 'white',
    fontSize: 11,
    justifyContent: 'center',
  },
});

export default TimeLeft;
