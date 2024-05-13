"use client";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const [loginType, SetloginType] = useState<any>();
  const GetProviders = async () => {
    const providers = await getProviders().then((res) => {
      //  console.log(res, "<<<<< : provider response");
      //  console.log(res?.github.name);
      console.log(res);
      //SetloginType(res);
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
                      signIn("line", { callbackUrl: "/page/loginView" })
                    }
                  >
                    登入
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
