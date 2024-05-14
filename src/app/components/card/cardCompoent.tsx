"use client";

import { CardDataType } from "@/app/types/type";
import { useEffect, useState } from "react";
import "./cardCompoent.css";
import Speaker from "../speaker/speaker";
import toast from "react-hot-toast";
import { CardVocabularyData } from "@prisma/client";

type CardCompoentProps = {
  title: string;
  cardData: CardVocabularyData;
  nextFunction: () => void;
};

export default function CardCompoent({
  title,
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
      SetinputText("");
      SetanswerState(true);
      setTimeout(() => {
        nextFunction();
      }, 1000);
      toast.success("正確, 即將繼續下一題");
    } else {
      SetinputTextStatus("....");
      SetanswerState(false);
    }
  }

  useEffect(() => {
    SetinputTextStatus("");
    SetanswerTip("");
    SetanswerState(false);
    SetinputText("");
  }, [cardData.question]);

  function watchAnswer() {
    if (answerState == true) {
      nextFunction();
      return;
    }

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
              單字挑戦{title}
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
                  value={inputText}
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
