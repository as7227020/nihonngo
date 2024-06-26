"use client";

import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginView from "./page/loginView/page";
import toast from "react-hot-toast";
import { User } from "./types/type";
import LoadingView from "./components/UI/loadingView";

export default function Home() {
  const session = useSession();

  const [userData, SetuserData] = useState<User>();
  const [emailOk, SetemailOk] = useState<boolean>(false);
  const [loginType, SetloginType] = useState<ClientSafeProvider[]>();
  const [loadingViewController, SetloadingViewController] = useState(true);

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

  console.log(session.status);
  useEffect(() => {
    // const session = await getServerSession(nextAuthOptions);
    SetloadingViewController(true);

    const res = session!.data?.user as User;

    if (res == null) {
      SetuserData(undefined);
    } else {
      SetuserData({
        id: res?.id!,
        name: res?.name!,
        email: res?.email!,
        emailVerified: res?.emailVerified!,
        image: res?.image!,
        isManager: res?.isManager,
        CardVocabularySelfData: [],
      });
    }

    GetProviders();
    SetloadingViewController(false);
  }, [session.status]);

  if (session.status == "loading") {
    return <div>loading...</div>;
  }

  return (
    <div className="container p-2">
      <LoadingView viewSwitch={loadingViewController} />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">日文學習網站へようこそ！</h5>
          <p className="card-text">ここでは漢字をたぶっり練習できます。</p>

          {session.status != "unauthenticated" ? (
            <div>HELLO {userData?.name}</div>
          ) : (
            <div>
              <p className="card-text">
                以下で登録すれば、練習の履歴が記録されます。
              </p>
              <p className="card-text">
                登録してない場合は、Webサイト利用できますが、履歴の記録はありません。
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
                  登録する際、メールは当サイトに記録されるため、ご了承ください。
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <button
                  onClick={() => {
                    if (emailOk == false) {
                      toast.error("メールの同意チェック必要です。");
                      return;
                    }
                    signIn("line", { callbackUrl: "/" });
                  }}
                  style={{
                    fontSize: "1.2rem",
                    borderRadius: "10px",
                    border: "1px solid #5da16e",
                    width: "200px",
                    height: "50px",
                    background: "#68e45c",
                    color: "#ffffff",
                    fontWeight: "500",
                    boxShadow: "0px 1px 5px #838282",
                    margin: "5px",
                  }}
                  id="loginLine"
                >
                  LINE 登録
                </button> */}
                <button
                  onClick={() => {
                    if (emailOk == false) {
                      toast.error("メールの同意チェック必要です。");
                      return;
                    }
                    signIn("google", { callbackUrl: "/" });
                  }}
                  style={{
                    fontSize: "1.2rem",
                    borderRadius: "10px",
                    border: "1px solid #3d4a81",
                    width: "200px",
                    height: "50px",
                    background: "#3b77c7",
                    color: "#ffffff",
                    fontWeight: "500",
                    boxShadow: "0px 1px 5px #838282",
                    margin: "5px",
                  }}
                  id="loginGoogle"
                >
                  Google 登録
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (emailOk == false) {
            toast.error("メールの同意チェック必要です。");
            return;
          }
          signIn("github", { callbackUrl: "/page/loginView" });
        }}
        style={{
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "1px solid #1f1f22",
          width: "200px",
          height: "50px",
          background: "#2a323b",
          color: "#ffffff",
          fontWeight: "500",
          boxShadow: "0px 1px 5px #838282",
          margin: "5px",
        }}
        id="logingithub"
      >
        github 登録
      </button>
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
