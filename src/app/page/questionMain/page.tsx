"use client";
import { GetCardData } from "@/app/testData";
import { CardDataType } from "@/app/types/type";
import React, { useEffect, useState } from "react";
import CardMain from "../cardMain/page";

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
            <CardMain cardData={cardData} nextFunction={() => {}} />
          </div>
        ))}
    </div>
  );
}
