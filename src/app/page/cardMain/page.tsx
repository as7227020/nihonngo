"use client";

import { Speak } from "@/app/components/speaker/speaker";
import { CardDataType } from "@/app/types/type";
import { useEffect, useState } from "react";
import "./page.css";

type CardMainProps = {
  cardData: CardDataType;
};

export default function CardMain({ cardData }: CardMainProps) {
  const [inputTextStatus, SetinputTextStatus] = useState("");
  const [answer, Setanswer] = useState(false);
  function inputAction(e: string) {
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
              <h5 className="card-title">
                單字 : {cardData.question}
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{
                    padding: "0px 4px",
                    color: "#53b16f",
                    background: "#07070",
                    border: "1px solid #707070",
                    marginLeft: "8px",
                    marginBottom: "3px",
                    height: "30px",
                    width: "30px",
                  }}
                  onClick={() => Speak(cardData.question, 2, 0.7, 0.7)}
                >
                  <i className="bi bi-megaphone-fill"></i>
                </button>
              </h5>
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
                  placeholder="輸入單字的片假名"
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
