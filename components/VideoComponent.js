import React, {useState, useEffect} from 'react';
import Video, {TextTrackType} from 'react-native-video';
import {ActivityIndicator, Text, View} from 'react-native';
import TimeLeft from './TimeLeft';
import PlayPause from './PlayPause';
import ControlLayout from './ControlLayout';
import ProgressBar from './ProgressBar';
import FullScreen from './FullScreen';
import ChangeLanguage from './ChangeLanguage';
import {conversor} from '../ConversorSrt';
import Layout from './Layout';
const VideoComponent = ({url, modalVisible, language}) => {
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const [elapsed, setElapsed] = useState('00:00');
  const [isShowControls, setIsShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    setBaseUrl(conversor(url));
  }, []);

  const timeReadable = (time) => {
    let duration = time / 60;
    let mins = Math.floor(duration);
    let seconds = duration % 1;
    seconds = (seconds * 60) / 1000;
    let currentTime = (mins + seconds * 10).toFixed(2);
    return currentTime;
  };
  const onProgress = (info) => {
    let currentTime = timeReadable(info.currentTime);
    setCurrentTime(currentTime);
    setProgressValue(info.currentTime / info.seekableDuration);
    setDuration(info.seekableDuration);
  };
  const onBuffer = ({isBuffering}) => {
    setLoading(isBuffering);
  };
  const playPause = () => {
    setPaused(!paused);
  };
  const onLoad = () => {
    setLoading(false);
  };
  const changeSliderStarted = (value) => {
    setProgressValue(value);
    videoRef.seek(duration * value);
  };

  const onChangeLanguage = () => {
    modalVisible(true);
  };

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) videoRef.presentFullscreenPlayer();
    else videoRef.dismissFullscreenPlayer();
  };

  const changeFinish = (value) => {
    setIsFinish(true);
    setPaused(true);
    setProgressValue(value);
    videoRef.seek(duration * value);
  };
  return (
    <Layout
      loading={loading}
      video={
        <Video
          ref={(val) => {
            setVideoRef(val);
          }}
          source={{
            uri: url,
          }}
          controls={false}
          fullscreen={false}
          resizeMode="contain"
          onBuffer={onBuffer}
          fullscreen={isFullScreen}
          fullscreenOrientation="landscape"
          onTouchStart={() => setIsShowControls(!isShowControls)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          controls={false}
          onLoad={onLoad}
          paused={paused}
          onProgress={onProgress}
          selectedTextTrack={{type: 'language', value: language}}
          textTracks={[
            {
              title: 'English CC',
              language: 'en',
              type: TextTrackType.VTT, // "text/vtt"
              uri:
                'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
            },
            {
              title: 'Spanish Subtitles',
              language: 'es',
              type: TextTrackType.SRT, // "application/x-subrip"
              uri: `https://media-analysis-us-east-1-423314702062.s3.amazonaws.com/private/us-east-1%3A1e759287-b368-4e95-a80e-82399b83cbf4/media/cf7b44e91ab50f1b81bfb9d0947fa5f2e1621d98/results/transcript-es.srt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWFD4FX3XMSOHI26Q%2F20200704%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200704T020709Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCICS66gy9bkQ4DDsnI%2ByVj9eNHxXoEnG7Ia68%2BEOxkKDZAiB2NjXProGSscIYG78Yo5VMnBKbDm4KTAGgewtKZidQLSrTBQiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDQyMzMxNDcwMjA2MiIMSca1xN6yBsIquasuKqcFpF9numH%2B8uL0GxddccX9c7Low%2FKslMvGzCADF2yHU%2B4RpNtHSqT7Rkubq%2FBKjLRBl69P1Mh6aBZc9hGVnk3qCqGeiAKdqGqC7kRWqVklbzZd%2B3Sb97wJeP7XDxQfI8FDy4uFbGTLuV4GPUVDUp2%2FRDFbzGGv9NawOIDhDXb7amvnlw%2Bgt8%2F%2F%2BnSR9MyGWTgHYtloExgRF7csDefuyeTu9%2F708Q5PKeXcCjYOkJPiGkNHJViJeVIIGJQS3Wl1K9GIRVWozglSqOlwnO%2F5iGpCL1M1axQM1vIS3bYow%2FdPxvb6buBAahBAA7B36AjTJzD3Qnd94uNbCEWJSH3SiOD7gVwTXYowg09cKNNz3%2Fc837tNRFBebWJ%2FKzSXEDUe%2FMJOJaiKHqdLIKi2kMFc2d%2By%2BPJ5MUe63EqbXMGNCis0HtQtliKgrZQlkRcJfBcOIaLMxycfXwKPb8%2FoLiCWGWyZuAXBce7avJ8SspUMqUiNXyVrHeXNwEVcoXoQoD3ei7M8JEIk6imMEQygKabqL9VZUlr9m3c8UYtT1w8kKI5gzdhec5doCqUHMyrg5g6Z%2BwpvKmKv1z4N31JsMW%2Fqu5FdFU%2BDx0a4gNyjL%2FXHXvt7oNv%2FEfa1vjK%2BvAuWnr2mjU6qmvTGeaBXPJ1h3QlqJTdXShjApS5zX1u3gMbSC9yjzbNKtPotsxdoP2bh2WpMa5KB%2Bqaw0%2FvkOmVfVav302%2FZpfP52iL5%2B9Gvfj7596jRMETEAC%2BOYU6w1T967Ul%2FtIizvLtCeVhF5lunB2KUODGFoGrjbVKhi%2FReiGMb5C0bATMfpOlYtyZPShZ6qF1WEOW%2FfNgAjOj3N3GwH%2FYdlvrZH6pLJoeaYptpszImFqdy8R7M7Ii7mqQ0B1IdHERf6efPk%2BUB7BAm4zDPyP%2F3BTrOAoym1CAh%2BUbQvU%2BASAiNVPIeNL8eVitBGd1AJuw92SUe4fDRlKSkuSB661FdSZ0aS0ArNYpXjeVHvnajTQNDDQNe3orK99dq1hHFqCwkyBb1rsk4wIT32XK%2BUE3uFNG5bnRaUT5JbPN4KXA952gevrMJUEjFuadIfGo6JBS3COPDG3eY71MsLv2D4fTji1jB4ZuIo77uUvLnpVhXgS3wTPZCsyfXXty7x%2FfSquRFYZXHf4mnaM7u1Q29DitsFx1nwq81s6BG2ESprPXBlUPpS%2FiuNCfV8KY0txyFFnMJ27xjH%2FA72O63gUho%2BwQjWoJ%2B4Xoxr0IUaAkO8qYeIenHLJsigLGTR3f%2BPIvlvTVIVk0g9T%2F%2BAivTFmocQDUaAtZtuJoKGT%2FOFCWr9pQE%2BJ30VY8dNe40azODePwi%2BaBpldRZX6eNbyrm%2BTaRpM3qmIA%3D&X-Amz-Signature=e14d8decf929357c4f17cd2a5b74a854bbd832f058ee66e32d6b70a53db44fdd&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-react-native-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.2%20aws-amplify%2F3.3.3%20react-native&x-id=GetObject`,
            },
          ]}
        />
      }
      loader={<ActivityIndicator color="red" />}
      isShowControls={isShowControls}
      controls={
        <ControlLayout>
          <ProgressBar
            progress={progressValue}
            onChangeStarted={changeSliderStarted}
            onSlidingComplete={changeFinish}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexWrap: 'wrap',
                alignContent: 'center',
              }}>
              <PlayPause onPress={playPause} pause={paused} />
              <TimeLeft currentTime={currentTime} duration={duration} />
            </View>
            <View
              style={{
                flexWrap: 'wrap',
                alignContent: 'center',
              }}>
              <ChangeLanguage onPress={onChangeLanguage} />
              <FullScreen onPress={onFullScreen} />
            </View>
          </View>
        </ControlLayout>
      }></Layout>
  );
};
export default React.memo(VideoComponent);
