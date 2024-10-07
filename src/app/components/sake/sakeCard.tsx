"use client";

import { SakeData } from "@/app/types/type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type sakeCardProps = {
  Sake_Data: SakeData;
};

export default function SakeCard({ Sake_Data }: sakeCardProps) {
  useEffect(() => {}, []);

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
              {Sake_Data.name}
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
                  酒廠 : {Sake_Data.brewerie} / 產區 : {Sake_Data.area}
                </h5>
              </div>
              <p
                title="Source Title"
                style={{ marginLeft: "5px", color: "#707070" }}
              >
                分數 : {Sake_Data.rankScore.toFixed(4)} / 產區排名 :{" "}
                {Sake_Data.rankArea}
                <br />
              </p>

              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Sake_Data.flover.length >= 1
                  ? Sake_Data.flover.map((data, index) => (
                      <span className="badge bg-secondary m-1" key={index}>
                        {data}
                      </span>
                    ))
                  : ""}
                <br />
              </div>

              <h5 className="mt-4" style={{ fontWeight: "500" }}>
                比例 :
                <div className="">
                  <span className="badge bg-info text-dark m-1">
                    華やか : {Sake_Data.chartF1.toFixed(4)}
                  </span>
                  <span className="badge bg-info text-dark m-1">
                    芳醇 : {Sake_Data.chartF2.toFixed(4)}
                  </span>
                  <span className="badge bg-info text-dark m-1">
                    重厚 : {Sake_Data.chartF3.toFixed(4)}
                  </span>
                  <br />
                  <span className="badge bg-info text-dark m-1">
                    穏やか : {Sake_Data.chartF4.toFixed(4)}
                  </span>

                  <span className="badge bg-info text-dark m-1">
                    ドライ : {Sake_Data.chartF5.toFixed(4)}
                  </span>
                  <span className="badge bg-info text-dark m-1">
                    軽快 : {Sake_Data.chartF6.toFixed(4)}
                  </span>
                </div>
                <br />
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
