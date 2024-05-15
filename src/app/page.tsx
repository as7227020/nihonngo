"use client";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginView from "./page/loginView/page";
import toast from "react-hot-toast";

export default function Home() {
  const test = async () => {
    console.log("click");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: "123" }),
    });

    const ans = response.json();
    console.log(ans);
  };
  const [emailOk, SetemailOk] = useState<boolean>(false);
  const [loginType, SetloginType] = useState<ClientSafeProvider[]>();
  const GetProviders = async () => {
    const providers = await getProviders().then((res) => {
      let loginType: ClientSafeProvider[] = [];
      //  console.log(res, "<<<<< : provider response");
      //  console.log(res?.github.name);
      Object.values(res!).map((provider, index) => {
        loginType.push(provider);
      });
      SetloginType(loginType);
    });
  };

  useEffect(() => {
    GetProviders();
  }, []);

  return (
    <div className="container p-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">日文學習網站へようこそ！</h5>
          <p className="card-text">ここに漢字をたぶっり練習できます。</p>
          <p className="card-text">
            以下でLINEを登録すれば、練習のデータを記録されます。
          </p>
          <p className="card-text">
            登録してないでも、Webサイトも利用できます！、ただ勉強の資料を記録されていない。
          </p>
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={emailOk}
              onChange={(e) => {
                SetemailOk(e.target.checked);
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              LINEを登録時、メールは当サイトにデータを記録ため、使うのを同意する。
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                if (emailOk == false) {
                  toast.error("メールの同意チェック必要です。");
                  return;
                }
                signIn("line", { callbackUrl: "/page/loginView" });
              }}
              style={{
                fontSize: "2rem",
                borderRadius: "10px",
                border: "1px solid #ffffff1",
                width: "200px",
                height: "50px",
                background: "#68e45c",
                color: "#ffffff",
                fontWeight: "500",
                boxShadow: "0px 1px 5px #838282",
                margin: "5px",
              }}
              disabled={emailOk!}
              id="loginLine"
            >
              LINE 登録
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*

 {loginType &&
            Object.values(loginType).map((provider, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/page/loginView" })
                    }
                  >
                    {provider.name} 登入
                  </button>
                </div>
              );
            })}
*/
