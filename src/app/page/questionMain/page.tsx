"use client";

import FinishUI from "@/app/components/UI/finishUI/finishUI";
import LoadingView from "@/app/components/UI/loadingView";
import AddVocabularyView from "@/app/components/addVocabularyView/page";
import CardCompoent from "@/app/components/card/cardCompoent";
import { GetUserData } from "@/app/components/user/getUserData";

import { CardDataType, TheFinishUIType, User } from "@/app/types/type";
import { CardVocabularyData } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function QuestionMain() {
  const [loadingViewController, SetloadingViewController] = useState(false);
  const [nowIndex, SetnowIndex] = useState(0);
  const [nowUserData, SetnowUserData] = useState<User>();

  //此輪的題目資料
  const [cardDatas, SetcardDatas] = useState<CardVocabularyData[]>([]);

  const [finishDatas, SetfinishDatas] = useState<TheFinishUIType[]>([]);

  const NextQuestion = (isGetTip: boolean) => {
    const nowIndexEmpty = nowIndex + 1;

    SetnowIndex(nowIndexEmpty);

    console.log(isGetTip);

    let nowFinishDatas = finishDatas;
    nowFinishDatas.push({
      question: cardDatas[nowIndex].question,
      answer: cardDatas[nowIndex].answer,
      isGetTip: isGetTip,
      cardIndex: cardDatas[nowIndex].index,
    });
    SetfinishDatas(nowFinishDatas);
    if (cardDatas.length == nowIndexEmpty) {
      console.log("SAVE!!!");
      PassVocablary();
    }
  };

  const PassVocablary = async () => {
    let addPassData: string[] = [];
    finishDatas.forEach((element) => {
      if (element.isGetTip == false) {
        addPassData.push(String(element.cardIndex));
      }
    });
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/passVocabulary/${nowUserData?.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputDataBody: {
            question: addPassData,
          },
        }),
      }
    );
    const resUserData = await userDatas.json();
    console.log(resUserData);
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

  const DoInit = async () => {
    SetloadingViewController(true);
    SetfinishDatas([]);
    SetnowIndex(0);
    GetCardData();
    GetUserData().then((res) => {
      console.log(res);
      SetnowUserData({
        id: res?.id!,
        name: res?.name!,
        email: res?.email!,
        image: res?.image!,
        emailVerified: res?.emailVerified!,
        isManager: res?.isManager!,
        UserLearnData: res?.UserLearnData,
        CardVocabularySelfData: res?.CardVocabularySelfData!,
      });
    });
    SetloadingViewController(false);
  };

  useEffect(() => {
    DoInit();
  }, []);
  return (
    <div>
      <LoadingView viewSwitch={loadingViewController} />
      {cardDatas.length >= 1 && cardDatas.length != nowIndex ? (
        <CardCompoent
          title={nowIndex + 1 + " / " + cardDatas.length}
          cardData={cardDatas[nowIndex]}
          nextFunction={(isGetTip) => {
            NextQuestion(isGetTip);
          }}
        />
      ) : cardDatas.length == 0 ? (
        <div>已經全部學習完成!!!</div>
      ) : (
        <FinishUI finishDatas={finishDatas} nextQuestion={DoInit} />
      )}
      需要再不按提示下才會算是已學會.
    </div>
  );
}
