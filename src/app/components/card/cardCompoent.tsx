"use client";

import { CardDataType } from "@/app/types/type";
import { useEffect, useState } from "react";
import "./cardCompoent.css";
import Speaker from "../speaker/speaker";
import toast from "react-hot-toast";
import { CardVocabularyData } from "@prisma/client";
import { VocabularyType } from "@/app/bsData";

type CardCompoentProps = {
  title: string;
  cardData: CardVocabularyData;
  nextFunction: (isGeTip: boolean) => void;
};

export default function CardCompoent({
  title,
  cardData,
  nextFunction,
}: CardCompoentProps) {
  //是否按過提示 案過就不會算會(不會計入已經記得的清單內)
  const [isGetTip, SetisGetTip] = useState(false);

  //使用者輸入的內容
  const [inputText, SetinputText] = useState("");

  //目前的輸入是否確證的提示(先無用 感覺不用顯示也沒關係 答對會自動下一提)
  const [inputTextStatus, SetinputTextStatus] = useState("");

  //目前是否已經答對
  const [answerState, SetanswerState] = useState(false);
  //顯示提示的文字(在正確完成回答後也會顯示一下答案在下一提 方便記憶)
  const [answerTip, SetanswerTip] = useState("");

  function inputAction(e: string) {
    SetinputText(e);

    if (e == cardData.answer) {
      SetinputTextStatus("正確");
      SetanswerTip(cardData.answer);
      SetanswerState(true);
      setTimeout(() => {
        SetinputText("");
        nextFunction(isGetTip);
      }, 1500);
      toast.success("正確, 即將繼續下一題");
    } else {
      SetinputTextStatus("....");
      SetanswerState(false);
    }
  }

  useEffect(() => {
    SetisGetTip(false);
    SetinputTextStatus("");
    SetanswerTip("");
    SetanswerState(false);
    SetinputText("");
    console.log("RESET");
  }, [cardData.question]);

  function watchAnswer() {
    if (answerState == true) {
      nextFunction(isGetTip);
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
      SetisGetTip(true);
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
              {cardData.vocabularyType >= 0
                ? "難度:" + VocabularyType[cardData.vocabularyType]
                : ""}{" "}
              進度({title})
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
                  {cardData.question}{" "}
                  {cardData.translateStr.length >= 1
                    ? "(" + cardData.translateStr + ")"
                    : ""}
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
              <h5 className="mt-4" style={{ fontWeight: "500" }}>
                備註 :
                <br />
                {cardData.note.length >= 1 ? "(" + cardData.note + ")" : ""}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
