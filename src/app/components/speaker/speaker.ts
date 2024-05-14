export function Speak(
  speakText: string,
  speakerType: number,
  rate: number,
  pitch: number
) {
  if (typeof window === "undefined") {
    return;
  }
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(speakText);
  const voiceData: SpeechSynthesisVoice[] = getVoice_Speakers();
  if (voiceData.length <= 0) {
    utterThis.lang = "ja-JP";
  } else {
    utterThis.voice = voiceData[speakerType];
  }
  utterThis.rate = rate;
  utterThis.pitch = pitch;
  synth.speak(utterThis);
}

export const getVoice_Speakers = (): SpeechSynthesisVoice[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const jp_Speaker = voices.filter((voice) => voice.lang == "ja-JP");
  return jp_Speaker;
};
