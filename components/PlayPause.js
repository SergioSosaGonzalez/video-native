import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PlayPause = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
      hitSlop={{left: 5, top: 5, bottom: 5, right: 5}}>
      {props.pause ? (
        <Icon name="play-arrow" size={20} color="#fff" />
      ) : (
        <Icon name="pause" size={20} color="#fff" />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 25,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
});
export default PlayPause;
