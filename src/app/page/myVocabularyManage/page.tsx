"use client";
import {
  CardVocabularyData,
  CardVocabularySelfData,
  UserLearnData,
} from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { VocabularyType } from "@/app/bsData";
import { DoTranslate, Gethiragara } from "@/app/components/action/helpAPI";
import LoadingView from "@/app/components/UI/loadingView";
import { User } from "@/app/types/type";
import { useSession } from "next-auth/react";
import { GetUserData } from "@/app/components/user/getUserData";
import ModalEmpty from "@/app/components/UI/modalEmpty/modalEmpty";
import CardReview from "@/app/components/UI/cardReview/cardReview";

export default function MyVocabularyManage() {
  const session = useSession();
  const userData = session!.data?.user as User;

  const GetInitData = () => {
    return {
      id: "",
      question: "",
      answer: "",
      translateStr: "",
      nowMemoryValue: 0,
      isBeMemory: false,
      note: "",
      vocabularyType: 0,
      isShow: true,
      userId: "",
      createDT: new Date(),
    };
  };

  const [isEditModel, SetisEditModel] = useState(false);
  const [isVocabularyShow, SetisVocabularyShow] = useState(true);
  const [loadingViewController, SetloadingViewController] = useState(false);
  const [isAutoTranslate, SetisAutoTranslate] = useState<boolean>(false);
  const [isAutoHiragana, SetisAutoHiragana] = useState<boolean>(false);
  const [vocabularytranslate, Setvocabularytranslate] = useState<string>("");
  const [CustomizationType, SetCustomizationType] = useState<string[]>([]);
  const [cardDatas, SetcardDatas] = useState<CardVocabularySelfData[]>([]);
  const [inputData, SetinputData] =
    useState<CardVocabularySelfData>(GetInitData);

  const AutoTranslateKey = "NihongoLearn_AutoTranslate_Record";
  const AutoHiraganaKey = "NihongoLearn_AutoHiragana_Record";
  const IsAutoTranslate = () => {
    let nowStatus = !isAutoTranslate;
    SetisAutoTranslate(nowStatus);
    localStorage.setItem(AutoTranslateKey, nowStatus ? "1" : "0");
  };
  const SetAutoTranslate = () => {
    if (localStorage.getItem(AutoTranslateKey) != null) {
      const status: boolean = localStorage.getItem(AutoTranslateKey) == "1";
      SetisAutoTranslate(status);
    }
  };
  const IsAutoHiragana = () => {
    let nowStatus = !isAutoHiragana;
    SetisAutoHiragana(!isAutoHiragana);
    localStorage.setItem(AutoHiraganaKey, nowStatus ? "1" : "0");
  };
  const SetAutoHiragana = () => {
    if (localStorage.getItem(AutoHiraganaKey) != null) {
      const status: boolean = localStorage.getItem(AutoHiraganaKey) == "1";
      SetisAutoHiragana(status);
    }
  };

  const AddData = async () => {
    if (userData == null) {
      toast.error("ERROR!");
      return;
    }

    let inputDataBody = inputData;

    inputDataBody.translateStr = vocabularytranslate;
    inputDataBody.isShow = isVocabularyShow;
    inputDataBody.userId = userData.id;
    console.log(inputData);
    //return;
    SetloadingViewController(true);
    if (isEditModel) {
      const userDatas = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addSelfVocabulary/${inputData.id}`,
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
        GetMyCard();
        // viewUpdate();
      } else {
        toast.error(resUserData.message);
      }
    } else {
      const userDatas = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addSelfVocabulary`,
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
        GetMyCard();
      } else {
        toast.error(resUserData.message);
      }
    }
    SetloadingViewController(false);
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

  const GetMyCard = async () => {
    GetUserData().then((res) => {
      console.log("我自身資料");
      console.log(res);
      console.log("我自身的卡片資料");
      console.log(res?.CardVocabularySelfData!);
      SetcardDatas(res?.CardVocabularySelfData!);
    });
  };

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

  useEffect(() => {
    GetMyCard();
    SetAutoTranslate();
    SetAutoHiragana();
    GetMyType();
  }, []);

  const ClearEditData = () => {
    SetisEditModel(false);
    SetinputData(GetInitData);
    Setvocabularytranslate("");
  };

  const OnClickEditBtn = async (index: number) => {
    console.log(CustomizationType[index]);
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cardCustom`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputDataBody: {
            updateIndex: index,
            updateStr: CustomizationType[index],
            updateAction: "update",
          },
        }),
      }
    );
    const resUserData = await userDatas.json();
    if (resUserData.status == 200) {
      console.log(resUserData.data);

      toast.success("更新成功");
      GetMyType();
    } else {
      toast.error(resUserData.message);
    }
  };
  const OnClickDeleteBtn = async (index: number) => {
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cardCustom`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputDataBody: {
            updateIndex: index,
            updateStr: "none",
            updateAction: "delete",
          },
        }),
      }
    );
    const resUserData = await userDatas.json();
    if (resUserData.status == 200) {
      console.log(resUserData.data);

      toast.success("增加成功");
      GetMyType();
    } else {
      toast.error(resUserData.message);
    }
  };
  const [nowAddTypeStr, SetnowAddTypeStr] = useState("");
  const [updateStr, SetupdateStr] = useState("");
  const OnClickAddBtn = async () => {
    console.log(nowAddTypeStr);
    if (CustomizationType.length >= 10) {
      toast.error("目前最多增加10個種類");
      return;
    }
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cardCustom`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputDataBody: {
            addTypeStr: nowAddTypeStr,
          },
        }),
      }
    );
    const resUserData = await userDatas.json();
    if (resUserData.status == 200) {
      console.log(resUserData.data);

      toast.success("增加成功");
      GetMyType();
    } else {
      toast.error(resUserData.message);
    }

    SetnowAddTypeStr("");
  };
  if (session.status == "loading") {
    return <div>check login data...</div>;
  }
  if (session.status == "unauthenticated") {
    return <div>ログインされていない状態、ログイン済みで利用可能です。</div>;
  }

  return (
    <div className="container p-2">
      <LoadingView viewSwitch={loadingViewController} />

      <div className="text-center d-flex gap-3">
        <ModalEmpty
          modalWindowNumber={2}
          btnName="單字分類編輯"
          theView={
            <div className="container p-0">
              <div className="card text-center">
                <div className="card-body">
                  <div className="mt-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      增加單字分類
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Ex.生活類, N3"
                      value={nowAddTypeStr}
                      onChange={(e) => SetnowAddTypeStr(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-success mt-3"
                      onClick={OnClickAddBtn}
                    >
                      增加
                    </button>
                  </div>
                </div>
                <div className="card-footer">
                  <table className="table table-success table-striped">
                    <thead>
                      <tr>
                        <th scope="col">分類</th>
                        <th scope="col">編輯</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CustomizationType &&
                        CustomizationType.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">
                              <input
                                style={{
                                  margin: "5px",
                                }}
                                type="text"
                                className="form-control"
                                value={data}
                                id="exampleFormControlInput1"
                                onChange={(e) => {
                                  const inputStr = e.target.value;
                                  SetupdateStr(inputStr);
                                  CustomizationType[index] = inputStr;

                                  SetCustomizationType(CustomizationType);
                                }}
                              />
                            </th>

                            <td
                              style={{
                                minWidth: "120px",
                              }}
                            >
                              <button
                                className="btn btn-primary  m-1"
                                data-bs-target="#exampleModalToggle"
                                onClick={() => OnClickEditBtn(index)}
                              >
                                更新
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
        />
        <ModalEmpty
          modalWindowNumber={1}
          btnName="單字管理畫面"
          theView={
            <div className="card text-center">
              <div className="card-body">
                <div style={{ display: "flex" }}>
                  <div className="form-check" style={{ width: "150px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      checked={isAutoTranslate}
                      onChange={(e) => {
                        IsAutoTranslate();
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      自動翻譯中文
                    </label>
                  </div>
                  <div className="form-check" style={{ width: "200px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault2"
                      checked={isAutoHiragana}
                      onChange={(e) => {
                        IsAutoHiragana();
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault2"
                    >
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
                    分類
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

                    {CustomizationType.map((data, index) => (
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
                        ClearEditData();
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
                      <label
                        className="form-check-label"
                        htmlFor="isVocabularyShow"
                      >
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
          }
        />
      </div>
      <div>
        <div>
          <div className="row">
            {cardDatas != null && cardDatas.length >= 1
              ? cardDatas.map((data) => (
                  <div className="col-6 mt-2" key={data.id}>
                    <CardReview
                      cardData={data}
                      typeStr={CustomizationType[data.vocabularyType]}
                      btnObj={
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#ModalEmptyModal_1"
                          className="btn btn-primary"
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
                      }
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">單字</th>
                <th scope="col">答案</th>
                <th scope="col">動作</th>
              </tr>
            </thead>
            <tbody>
              {cardDatas != null && cardDatas.length > 0 ? (
                cardDatas.map((data) => (
                  <tr key={data.id}>
                    <td>{data.question}</td>
                    <td>{data.answer}</td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#ModalEmptyModal_1"
                        className="btn btn-primary"
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
