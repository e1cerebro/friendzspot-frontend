export const CHAT_API_URL = 'http://127.0.0.1:4000';

export const get_audio_permission = async () => {
  //Request the audio capability of the device
  try {
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return audioStream;
  } catch (error) {
    return false;
  }
};

// stop both mic and camera
export const stopBothVideoAndAudio = stream => {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live') {
      track.stop();
    }
  });
};

// stop only camera
export const stopVideoOnly = stream => {
  if (stream) {
    stream.getTracks().forEach(function (track) {
      if (track.readyState == 'live' && track.kind === 'video') {
        track.stop();
      }
    });
  }
};

// start only camera
export const startVideoOnly = stream => {
  console.log('Video started!');
  console.log(stream);
  if (stream) {
    stream.getTracks().forEach(function (track) {
      if (track.readyState == 'live' && track.kind === 'video') {
        track.play();
      }
    });
  } else {
    console.log('Hello');
  }
};

// stop only mic
export const stopAudioOnly = stream => {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live' && track.kind === 'audio') {
      track.stop();
    }
  });
};
