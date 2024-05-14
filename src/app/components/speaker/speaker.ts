export function Speak(
  speakText: string,
  speakerType: number,
  rate: number,
  pitch: number
) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(speakText);
  utterThis.voice = getVoice_Speakers()[speakerType];
  utterThis.rate = rate;
  utterThis.pitch = pitch;
  synth.speak(utterThis);
}

export const getVoice_Speakers = (): SpeechSynthesisVoice[] => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const jp_Speaker = voices.filter((voice) => voice.lang == "ja-JP");
  return jp_Speaker;
};
