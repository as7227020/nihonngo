"use client";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginView from "./page/loginView/page";

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
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
          </p>

          <button
            onClick={() => {
              test();
            }}
          >
            點
          </button>

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
        </div>
      </div>
    </div>
  );
}
