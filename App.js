/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  YellowBox,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {makeRequest} from './FecthServices';
import Amplify, {Storage} from 'aws-amplify';
import {MyStorageProvider} from './services/MyStorageProvider';
import VideoComponent from './components/VideoComponent';
import {awsConfiguration} from './AwsConfiguration';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.disableYellowBox = true;
const providers = Storage._pluggables;
providers.forEach((provider) => {
  Storage.removePluggable(provider.getProviderName());
});

// We add `AWSS3Provider` provider to avoid get a non-existent path for our project.
Storage.addPluggable(new MyStorageProvider());

Amplify.configure(awsConfiguration);
const App: () => React$Node = () => {
  const ln = ['es', 'en', 'pt', 'fr', 'zh', 'tr'];
  //const ln = [{code: 'es'}];
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    makeRequest().then((videos) => {
      console.log(videos[0]);
      setUrl(videos[0]);
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {!url ? (
            <Text>Aun no esta listo</Text>
          ) : (
            <View style={styles.body}>
              <Text style={{textAlign: 'center', fontSize: 23}}>
                Video de prueba
              </Text>
              <View
                style={{
                  position: 'relative',
                }}>
                <VideoComponent
                  url={url}
                  modalVisible={() => setVisible(true)}
                  language={language}
                />
              </View>
            </View>
          )}
        </ScrollView>
        <Modal visible={visible} transparent>
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <View
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,.5)'}}
              onTouchStart={() => setVisible(false)}></View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 24, paddingTop: 15, paddingBottom: 15}}>
                Subtitulos:
              </Text>
              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <FlatList
                  data={ln}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={{height: 40, borderColor: 'grey'}}
                        onPress={() => {
                          setLanguage(item);
                          setVisible(false);
                        }}>
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item) => item.index}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    right: 0,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
