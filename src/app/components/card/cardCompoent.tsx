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
  const [answerState, SetanswerState] = useState(false);
  const [answerTip, SetanswerTip] = useState("");

  function inputAction(e: string) {
    SetinputText(e);

    if (e == cardData.answer) {
      SetinputTextStatus("正確");
      SetanswerState(true);
    } else {
      SetinputTextStatus("....");
      SetanswerState(false);
    }
  }

  function watchAnswer() {
    const tipIndex = Math.floor(Math.random() * cardData.answer.length);

    let showTip = "";
    let nowShowIndex: number[] = [];
    for (let index = 0; index < answerTip.length; index++) {
      if (answerTip[index] != "*") {
        nowShowIndex.push(index);
      }
    }

    for (let index = 0; index < cardData.answer.length; index++) {
      if (nowShowIndex.includes(index) == true || tipIndex == index) {
        showTip += cardData.answer[index];
      } else {
        showTip += " " + "*" + " ";
      }
    }

    if (answerState == false) {
      SetanswerTip(showTip);
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
              單字挑戦（1/1）
            </h5>
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title" style={{ fontWeight: "500" }}>
                  {cardData.question}
                </h5>
                <Speaker
                  speakText={cardData.question}
                  speakerType={2}
                  rate={0.8}
                  pitch={0.8}
                />
              </div>
              {answerTip.length >= 1 ? (
                <cite
                  title="Source Title"
                  style={{ marginLeft: "5px", color: "#707070" }}
                >
                  {answerTip}
                </cite>
              ) : null}

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
                    answerState == false
                      ? " m-3 rounded inputType"
                      : " m-3 rounded inputTypeOK inputType"
                  }
                  placeholder="輸入單字的平假名"
                  onChange={(e) => {
                    inputAction(e.target.value);
                  }}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={watchAnswer}
              >
                {answerState ? "下一題" : "隨機提示"}
              </button>
            </div>
            {inputTextStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
