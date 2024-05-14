"use client";
import { CardVocabularyData } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddVocabularyView() {
  const GetInitData = () => {
    return {
      id: "",
      index: 0,
      question: "",
      answer: "",
      supperUser: "",
      note: "",
      isShow: true,
      createDT: new Date(),
    };
  };
  const GetCardData = async () => {
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary`
    );
    const resUserData = await userDatas.json();
    console.log("resUserData");
    console.log(resUserData);
    SetcardDatas(resUserData.data);
    //  SetcardDatas()
  };

  const [cardDatas, SetcardDatas] = useState<CardVocabularyData[]>([]);
  const [inputData, SetinputData] = useState<CardVocabularyData>(GetInitData);

  const AddData = async () => {
    const userDatas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/addVocabulary`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputData,
        }),
      }
    );
    const resUserData = await userDatas.json();
    if (resUserData.status == 200) {
      toast.success("增加成功");
      SetinputData(GetInitData);

      // viewUpdate();
    } else {
      toast.error(resUserData.message);
    }
  };

  useEffect(() => {
    GetCardData();
  }, []);

  return (
    <div className="container p-2">
      <div className="card text-center">
        <div className="card-header">單字管理</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "auto" }}>
              單字
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder={inputData?.question}
              value={inputData?.question}
              onChange={(e) => {
                SetinputData({
                  ...inputData!,
                  question: e.target.value,
                });
              }}
            />
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
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              AddData();
            }}
          >
            增加
          </button>
        </div>
      </div>
      <div className="row">
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
                      <button>不顯示</button>
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
