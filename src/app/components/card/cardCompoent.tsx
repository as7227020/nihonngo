"use client";

import { CardDataType } from "@/app/types/type";
import { useEffect, useState } from "react";
import "./cardCompoent.css";
import Speaker from "../speaker/speaker";

type CardCompoentProps = {
  cardData: CardDataType;
  nextFunction: () => void;
};

export default function CardCompoent({
  cardData,
  nextFunction,
}: CardCompoentProps) {
  const [inputText, SetinputText] = useState("");
  const [inputTextStatus, SetinputTextStatus] = useState("");
  const [answer, Setanswer] = useState(false);
  function inputAction(e: string) {
    SetinputText(e);

    if (e == cardData.answer) {
      SetinputTextStatus("正確");
      Setanswer(true);
    } else {
      SetinputTextStatus("....");
      Setanswer(false);
    }
  }

  return (
    <div className="container p-2">
      <div
        className="row mb-3 text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-12">
          <div className="card text-center">
            <h5 className="card-header" style={{ fontWeight: "600" }}>
              挑戦（1/1）
            </h5>
            <div className="card-body">
              <h5 className="card-title">單字 : {cardData.question}</h5>
              <Speaker
                speakText={cardData.question}
                speakerType={2}
                rate={0.8}
                pitch={0.8}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  aria-label="First name"
                  className={
                    answer == false
                      ? " m-3 rounded inputType"
                      : " m-3 rounded inputTypeOK inputType"
                  }
                  placeholder="輸入單字的平假名"
                  onChange={(e) => {
                    inputAction(e.target.value);
                  }}
                />
              </div>

              <button type="button" className="btn btn-primary">
                {answer ? "下一題" : "看答案"}
              </button>
            </div>
            {inputTextStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
