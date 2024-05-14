"use client";
import CardCompoent from "@/app/components/card/cardCompoent";
import { GetCardData } from "@/app/testData";
import { CardDataType } from "@/app/types/type";
import React, { useEffect, useState } from "react";

export default function QuestionMain() {
  const [cardDatas, SetcardDatas] = useState<CardDataType[]>([]);
  useEffect(() => {
    SetcardDatas(GetCardData());
  }, []);
  return (
    <div>
      {cardDatas &&
        cardDatas.map((cardData, index) => (
          <div key={index}>
            <CardCompoent cardData={cardData} nextFunction={() => {}} />
          </div>
        ))}
    </div>
  );
}
