"use client";
import React, { useEffect, useState } from "react";
import LoadingView from "../loadingView";
import { useSession } from "next-auth/react";
import { TheFinishUIType, User } from "@/app/types/type";
import { GetUserData } from "../../user/getUserData";
import { CardVocabularySelfData } from "@prisma/client";
import CardCompoent from "../../card/cardCompoent";
import { CardVocabularySelfDataToComponenet } from "@/app/tools";
import FinishUI from "../finishUI/finishUI";

type SelfCardTestUIProps = {
  testCardData: CardVocabularySelfData[];
  addPint: number;
};
export default function SelfCardTestUI({
  testCardData,
  addPint,
}: SelfCardTestUIProps) {
  const session = useSession();
  const userData = session!.data?.user as User;

  const [loadingViewController, SetloadingViewController] = useState(false);
  const [finishDatas, SetfinishDatas] = useState<TheFinishUIType[]>([]);
  const [nowIndex, SetnowIndex] = useState(0);

  if (testCardData == null || testCardData.length <= 0) {
    return <div></div>;
  }

  const DoInit = async () => {
    SetloadingViewController(true);
    SetfinishDatas([]);
    SetnowIndex(0);

    SetloadingViewController(false);
  };
  const PassVocablary = async () => {
    let addPassData: string[] = [];
    finishDatas.forEach((element) => {
      if (element.isGetTip == false) {
        addPassData.push(String(element.cardIndex));
      }
    });
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/myVocabulary`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputDataBody: {
            passCardId: addPassData,
            addPint: addPint,
          },
        }),
      }
    );
    const resUserData = await userDatas.json();
    console.log(resUserData);
  };

  const NextQuestion = (isGetTip: boolean) => {
    const nowIndexEmpty = nowIndex + 1;

    SetnowIndex(nowIndexEmpty);

    console.log(isGetTip);

    let nowFinishDatas = finishDatas;
    nowFinishDatas.push({
      question: testCardData[nowIndex].question,
      answer: testCardData[nowIndex].answer,
      isGetTip: isGetTip,
      cardIndex: testCardData[nowIndex].id,
    });
    SetfinishDatas(nowFinishDatas);
    if (testCardData.length == nowIndexEmpty) {
      console.log("SAVE!!!");
      PassVocablary();
    }
  };

  if (session.status == "loading") {
    return <div>check login data...</div>;
  }
  if (session.status == "unauthenticated") {
    return <div>ログインされていない状態、ログイン済みで利用可能です。</div>;
  }

  return (
    <div>
      <LoadingView viewSwitch={loadingViewController} />
      {testCardData.length >= 1 && testCardData.length != nowIndex ? (
        <CardCompoent
          title={nowIndex + 1 + " / " + testCardData.length}
          cardData={CardVocabularySelfDataToComponenet(testCardData[nowIndex])}
          nextFunction={(isGetTip) => {
            NextQuestion(isGetTip);
          }}
        />
      ) : testCardData.length == 0 ? (
        <div>已經全部學習完成!!!</div>
      ) : (
        <FinishUI finishDatas={finishDatas} nextQuestion={DoInit} />
      )}
      需要再不按提示下才會算是已學會.
    </div>
  );
}
