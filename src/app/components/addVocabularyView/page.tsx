"use client";
import { CardVocabularyData } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DoTranslate, Gethiragara } from "../action/helpAPI";
import LoadingView from "../UI/loadingView";
import { VocabularyType } from "@/app/bsData";

export default function AddVocabularyView() {
  const GetInitData = () => {
    return {
      id: "",
      index: 0,
      question: "",
      answer: "",
      translateStr: "",
      supperUser: "",
      note: "",
      vocabularyType: 0,
      isShow: true,
      createDT: new Date(),
    };
  };
  const GetCardData = async () => {
    SetloadingViewController(true);
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary`
    );
    const resUserData = await userDatas.json();
    console.log("resUserData");
    console.log(resUserData);
    SetcardDatas(resUserData.data);
    SetloadingViewController(false);
  };
  const [isEditModel, SetisEditModel] = useState(false);
  const [isVocabularyShow, SetisVocabularyShow] = useState(true);
  const [loadingViewController, SetloadingViewController] = useState(true);
  const [isAutoTranslate, SetisAutoTranslate] = useState<boolean>(false);
  const [isAutoHiragana, SetisAutoHiragana] = useState<boolean>(false);
  const [vocabularytranslate, Setvocabularytranslate] = useState<string>("");
  const [cardDatas, SetcardDatas] = useState<CardVocabularyData[]>([]);
  const [inputData, SetinputData] = useState<CardVocabularyData>(GetInitData);

  const AddData = async () => {
    let empty = cardDatas;
    let inputDataBody = inputData;
    inputDataBody.index = cardDatas.length + 1;
    inputDataBody.translateStr = vocabularytranslate;
    inputDataBody.isShow = isVocabularyShow;

    console.log(inputData);
    // return;
    if (isEditModel) {
      const userDatas = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary/${inputData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputDataBody,
          }),
        }
      );
      const resUserData = await userDatas.json();
      if (resUserData.status == 200) {
        console.log(resUserData.data);

        toast.success("更新完成");
        SetinputData(GetInitData);
        Setvocabularytranslate("");
        // viewUpdate();
      } else {
        toast.error(resUserData.message);
      }
    } else {
      empty.push(inputDataBody);
      SetcardDatas(empty);
      const userDatas = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputDataBody,
          }),
        }
      );
      const resUserData = await userDatas.json();
      if (resUserData.status == 200) {
        console.log(resUserData.data);

        toast.success("增加成功");
        SetinputData(GetInitData);
        Setvocabularytranslate("");
        // viewUpdate();
      } else {
        toast.error(resUserData.message);
      }
    }
  };

  const translate = async (vocabulary: string): Promise<any> => {
    Setvocabularytranslate("正在翻譯...");
    DoTranslate(vocabulary).then((res) => {
      if (res.code == 200) {
        Setvocabularytranslate(res.text);
        //console.log(res.text);
        return res.text;
      } else {
        Setvocabularytranslate("翻譯失敗");
        //console.log("錯誤");
        return "X";
      }
    });
  };

  const toHiRaGana = async (vocabulary: string) => {
    console.log("-> " + vocabulary);
    Gethiragara(vocabulary).then((res) => {
      if (res.error === undefined) {
        //沒有錯誤
        console.log(res.converted);
        SetinputData({
          ...inputData!,
          answer: res.converted,
        });
      } else {
        console.log(res.error);
      }

      // if (res.code == 200) {

      //   //console.log(res.text);
      // } else {
      //   Setvocabularytranslate("翻譯失敗");
      //   //console.log("錯誤");
      // }
    });
  };

  useEffect(() => {
    GetCardData();
  }, []);

  return (
    <div className="container p-2">
      <LoadingView viewSwitch={loadingViewController} />
      <div className="card text-center">
        <div className="card-header">單字管理</div>
        <div className="card-body">
          <div style={{ display: "flex" }}>
            <div className="form-check" style={{ width: "150px" }}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={(e) => {
                  SetisAutoTranslate(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                自動翻譯中文
              </label>
            </div>
            <div className="form-check" style={{ width: "200px" }}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault2"
                onChange={(e) => {
                  SetisAutoHiragana(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                自動顯示ひらがな
              </label>
            </div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              單字
            </span>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                value={inputData?.question}
                id="floatingvocabulary"
                placeholder={inputData?.question}
                onBlur={(e) => {
                  if (isAutoTranslate) {
                    translate(e.target.value);
                  }
                  if (isAutoHiragana) {
                    toHiRaGana(e.target.value);
                  }

                  console.log("---");
                }}
                onChange={(e) => {
                  SetinputData({
                    ...inputData!,
                    question: e.target.value,
                  });
                }}
              />
              <label htmlFor="floatingPassword">增加的日文單字</label>
            </div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              答案
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder={inputData?.answer}
              value={inputData?.answer}
              onChange={(e) => {
                SetinputData({
                  ...inputData!,
                  answer: e.target.value,
                });
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              翻譯
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder={vocabularytranslate}
              value={vocabularytranslate}
              onChange={(e) => {
                SetinputData({
                  ...inputData!,
                  translateStr: e.target.value,
                });
                Setvocabularytranslate(e.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              備註
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder={inputData.note}
              value={inputData.note}
              onChange={(e) => {
                SetinputData({
                  ...inputData!,
                  note: e.target.value,
                });
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              難度
            </span>
            <select
              className="form-select"
              aria-label="Default select example"
              id="role"
              value={inputData?.vocabularyType}
              onChange={(e) => {
                SetinputData({
                  ...inputData!,
                  vocabularyType: Number(e.target.value),
                });
              }}
            >
              <option value="">請選擇</option>

              {Object.keys(VocabularyType)
                .filter((x) => isNaN(Number(x)))
                .map((data, index) => (
                  <option key={index} value={index}>
                    {data}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="card-footer">
          {isEditModel ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  AddData();
                }}
              >
                更新修改
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  SetisEditModel(false);
                  SetinputData(GetInitData);
                }}
              >
                放棄
              </button>
              <div className="form-check" style={{ width: "150px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isVocabularyShow}
                  id="isVocabularyShow"
                  onChange={(e) => {
                    SetisVocabularyShow(e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="isVocabularyShow">
                  是否顯示
                </label>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                AddData();
              }}
            >
              增加
            </button>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">編號</th>
                <th scope="col">單字</th>
                <th scope="col">答案</th>
                <th scope="col">動作</th>
              </tr>
            </thead>
            <tbody>
              {cardDatas.length > 0 ? (
                cardDatas.map((data) => (
                  <tr key={data.id}>
                    <th scope="row">{data.index}</th>
                    <td>{data.question}</td>
                    <td>{data.answer}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          SetisEditModel(true);
                          console.log(data.id);
                          SetinputData(GetInitData);
                          SetinputData(data);
                          SetisVocabularyShow(data.isShow);
                          Setvocabularytranslate(data.translateStr);
                        }}
                      >
                        編輯
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={0}>
                  <th scope="row">---</th>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
