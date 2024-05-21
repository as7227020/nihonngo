"use client";
import SelfCardTestUI from "@/app/components/UI/selfCardTestUI/selfCardTestUI";
import { GetUserData } from "@/app/components/user/getUserData";
import { CardVocabularySelfData, UserLearnData } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyVocabulary() {
  const [nowLearnTypeIndex, SetnowLearnTypeIndex] = useState(0);
  const [nowLearnValue, SetnowLearnValue] = useState("100");
  const [nowLearnCardCount, SetnowLearnCardCount] = useState("5");
  const [nowLearnAddValue, SetnowLearnAddValue] = useState("10");
  const [CustomizationType, SetCustomizationType] = useState<string[]>([]);

  const GetMyType = async () => {
    const learnDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/learnData`
    );
    const reslearnDatas = await learnDatas.json();
    if (reslearnDatas.status == 200) {
      console.log("我自身的類型資料");
      const learnData: UserLearnData = reslearnDatas.data;
      console.log(learnData);
      SetCustomizationType(learnData.theUserCustomizationType);
    } else {
      toast.error(reslearnDatas.message);
    }
  };
  const [testCardDatas, SettestCardDatas] = useState<CardVocabularySelfData[]>(
    []
  );
  const GetMyCard = async () => {
    GetUserData().then((res) => {
      console.log("我自身資料");
      console.log(res);

      const nowAllCardData: CardVocabularySelfData[] =
        res?.CardVocabularySelfData!;
      let testData: CardVocabularySelfData[] = [];

      nowAllCardData.forEach((element) => {
        if (testData.length > Number.parseInt(nowLearnCardCount)) {
          return;
        }
        if (nowLearnTypeIndex == -1) {
          testData.push(element);
          console.log(nowLearnTypeIndex);
          return;
        }
        if (
          element.vocabularyType == nowLearnTypeIndex &&
          element.nowMemoryValue <= Number.parseInt(nowLearnValue)
        ) {
          testData.push(element);
          console.log(element.question);
          return;
        }
      });
      console.log("要測驗的資料");
      console.log(testData);
      if (testData.length <= 0) {
        toast.error("沒有資料");
      }

      SettestCardDatas(testData);
    });
  };
  const GetTestData = async () => {
    SettestCardDatas([]);
    GetMyCard();
  };

  useEffect(() => {
    GetMyType();
  }, []);

  return (
    <div className="container">
      {testCardDatas.length <= 0 ? (
        <div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              選擇學習的卡片分類
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                const theIndex =
                  e.target.value.length >= 3
                    ? -1
                    : Number.parseInt(e.target.value);
                console.log(theIndex);
                SetnowLearnTypeIndex(theIndex);
              }}
            >
              <option selected>選擇學習的單字類型</option>
              {CustomizationType.length >= 1
                ? CustomizationType.map((data, index) => (
                    <option key={index} value={index}>
                      {data}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              目前學習分數範圍 {nowLearnValue}
            </label>
            <input
              value={nowLearnValue}
              type="range"
              className="form-range"
              id="customRange1"
              step="1"
              style={{ background: "#d1d1d1" }}
              onChange={(e) => SetnowLearnValue(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              學習張數 (最多25張) {nowLearnCardCount}
            </label>
            <input
              value={nowLearnCardCount}
              type="range"
              className="form-range"
              id="customRange1"
              step="1"
              min={1}
              max={25}
              style={{ background: "#d1d1d1" }}
              onChange={(e) => SetnowLearnCardCount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              答對後加幾分的學習點 {nowLearnAddValue}
            </label>
            <input
              value={nowLearnAddValue}
              type="range"
              className="form-range"
              id="customRange1"
              step="1"
              min={1}
              max={100}
              style={{ background: "#d1d1d1" }}
              onChange={(e) => SetnowLearnAddValue(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              style={{ minWidth: "250px" }}
              onClick={GetTestData}
            >
              開始學習
            </button>
          </div>
        </div>
      ) : null}

      <SelfCardTestUI
        testCardData={testCardDatas}
        addPint={Number.parseInt(nowLearnAddValue)}
      />
    </div>
  );
}
