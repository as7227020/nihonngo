import React, { useEffect, useState } from "react";

type SpeakerProps = {
  speakText: string;
  speakerType: number;
  rate: number;
  pitch: number;
};

export default function Speaker({
  speakText,
  speakerType,
  rate,
  pitch,
}: SpeakerProps) {
  const [SpeechSynthesisData, SetSpeechSynthesisData] =
    useState<SpeechSynthesis>();
  useEffect(() => {
    SetSpeechSynthesisData(window.speechSynthesis);
  }, []);
  function DoSpeak() {
    const utterThis = new SpeechSynthesisUtterance(speakText);
    const voiceData: SpeechSynthesisVoice[] = getVoice_Speakers();
    if (voiceData.length <= 0) {
      utterThis.lang = "ja-JP";
    } else {
      utterThis.voice = voiceData[speakerType];
    }

    utterThis.rate = rate;
    utterThis.pitch = pitch;
    SpeechSynthesisData?.speak(utterThis);
  }

  const getVoice_Speakers = (): SpeechSynthesisVoice[] => {
    const voices = SpeechSynthesisData?.getVoices();
    const jp_Speaker = voices!.filter((voice) => voice.lang == "ja-JP");
    return jp_Speaker;
  };

  return (
    <div>
      <button
        style={{
          padding: "0px 4px",
          color: "#53b16f",
          background: "#07070",
          border: "1px solid #707070",
          marginLeft: "8px",
          marginRight: "8px",
          marginBottom: "6px",
          height: "25px",
          width: "25px",
          borderRadius: "5px",
        }}
        onClick={() => {
          DoSpeak();
        }}
      >
        {" "}
        <i className="bi bi-megaphone-fill"></i>
      </button>
    </div>
  );
}
