import React from "react";
import Speaker from "../../speaker/speaker";
import { TheFinishUIType } from "@/app/types/type";

const ReCard = (data: TheFinishUIType) => {
  //把答對的(沒有案提示)的就不顯示
  if (data.isGetTip == false) return null;
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title">{data.question}</h5>
                <Speaker
                  speakText={data.question}
                  speakerType={2}
                  rate={0.8}
                  pitch={0.8}
                />
              </div>

              <p className="card-text">
                <small className="text-muted">{data.answer}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type FinishUIProps = {
  finishDatas: TheFinishUIType[];
  nextQuestion: () => void;
};
export default function FinishUI({ finishDatas, nextQuestion }: FinishUIProps) {
  function GetTipCount(): number {
    return finishDatas.filter((x) => x.isGetTip == false).length;
  }

  return (
    <div className="container p-2">
      <div
        className="row mb-3 text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-12">
          <div className="card text-center">
            <h5 className="card-header" style={{ fontWeight: "600" }}>
              恭喜完成
            </h5>
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title" style={{ fontWeight: "500" }}>
                  測驗{finishDatas.length}筆的結果 :<br />
                  <br /> 答對:
                  {finishDatas.length - (finishDatas.length - GetTipCount())}題
                  需加強:{finishDatas.length - GetTipCount()}題
                </h5>
              </div>
              {finishDatas.length >= 1 &&
                finishDatas.map((data) => ReCard(data))}

              <button
                type="button"
                className="btn btn-primary"
                onClick={nextQuestion}
              >
                再隨機測驗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
