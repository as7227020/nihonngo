export function Speak(
  speakText: string,
  speakerType: number,
  rate: number,
  pitch: number
) {
  if (window == null) {
    return;
  }
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(speakText);
  utterThis.voice = getVoice_Speakers()[speakerType];
  utterThis.rate = rate;
  utterThis.pitch = pitch;
  synth.speak(utterThis);
}

export const getVoice_Speakers = (): SpeechSynthesisVoice[] => {
  if (window == null) {
    return [];
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const jp_Speaker = voices.filter((voice) => voice.lang == "ja-JP");
  return jp_Speaker;
};
