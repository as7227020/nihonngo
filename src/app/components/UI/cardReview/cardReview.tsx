"use client";
import { CardVocabularySelfData } from "@prisma/client";
import React from "react";
import Speaker from "../../speaker/speaker";

type cardReviewProps = {
  cardData: CardVocabularySelfData;
  typeStr: string;
  btnObj: any;
};
export default function CardReview({
  cardData,
  typeStr,
  btnObj,
}: cardReviewProps) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <div className="d-flex">
            {cardData.question}{" "}
            <Speaker
              speakText={cardData.question}
              speakerType={2}
              rate={0.8}
              pitch={0.8}
            />
          </div>

          <p className="card-text">{cardData.answer} </p>
        </div>
        <div className="card-text">熟悉度 : {cardData.nowMemoryValue}/100</div>
        <div className="card-text">備註 : {cardData.note}</div>
        <div className="card-text">翻譯 : {cardData.translateStr}</div>
        <div className="card-text">
          熟悉 : {cardData.isBeMemory == true ? "O" : "X"}
        </div>
        <div className="card-text">類型 : {typeStr}</div>
        {btnObj}
      </div>
    </div>
  );
}
