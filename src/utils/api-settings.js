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
