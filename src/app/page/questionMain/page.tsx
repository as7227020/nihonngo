"use client";
import CardCompoent from "@/app/components/card/cardCompoent";
import { GetCardData } from "@/app/testData";
import { CardDataType } from "@/app/types/type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function QuestionMain() {
  const [nowIndex, SetnowIndex] = useState(0);

  const NextQuestion = () => {
    if (cardDatas.length == nowIndex + 1) {
      toast.error("已經是最後一題");
      return;
    }

    SetnowIndex(nowIndex + 1);
  };
  const [cardDatas, SetcardDatas] = useState<CardDataType[]>([]);
  useEffect(() => {
    SetcardDatas(GetCardData());
  }, []);
  return (
    <div>
      {cardDatas.length >= 1 && (
        <CardCompoent
          title={nowIndex + 1 + " / " + cardDatas.length}
          cardData={cardDatas[nowIndex]}
          nextFunction={() => {
            NextQuestion();
          }}
        />
      )}
    </div>
  );
}
