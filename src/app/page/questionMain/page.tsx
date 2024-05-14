"use client";
import AddVocabularyView from "@/app/components/addVocabularyView/page";
import CardCompoent from "@/app/components/card/cardCompoent";
import { GetUserData } from "@/app/components/user/getUserData";

import { CardDataType, User } from "@/app/types/type";
import { CardVocabularyData } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function QuestionMain() {
  const [nowIndex, SetnowIndex] = useState(0);
  const [nowUserData, SetnowUserData] = useState<User>();

  const NextQuestion = () => {
    if (cardDatas.length == nowIndex + 1) {
      toast.error("已經是最後一題");
      return;
    }

    SetnowIndex(nowIndex + 1);
  };

  const GetCardData = async () => {
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary`
    );
    const resUserData = await userDatas.json();
    console.log(resUserData);
    SetcardDatas(resUserData.data);
    //  SetcardDatas()
  };

  const [cardDatas, SetcardDatas] = useState<CardVocabularyData[]>([]);
  useEffect(() => {
    GetCardData();
    GetUserData().then((res) => {
      console.log(res);
      SetnowUserData({
        id: res?.id!,
        name: res?.name!,
        email: res?.email!,
        image: res?.image!,
        emailVerified: res?.emailVerified!,
      });
    });

    // SetcardDatas(GetCardData());
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
      <br />
      開發方便用的...
      <br />
      <AddVocabularyView />
    </div>
  );
}
