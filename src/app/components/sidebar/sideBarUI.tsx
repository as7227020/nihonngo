"use client";
import React, { useEffect, useRef, useState } from "react";
import "./sidebarUI.css";
import { useRouter } from "next/navigation";
import { GetUserData } from "../user/getUserData";
import { User } from "@/app/types/type";
import { signIn, signOut, useSession } from "next-auth/react";
/*
    background-color: #273270;
    color: white;
    height: 100%;
    display: grid;
    justify-content: center;
    align-content: start;
    padding: 12px;
*/
type SideBarUIProps = {
  child: any;
};
export default function SideBarUI({ child }: SideBarUIProps) {
  const session = useSession();

  const router = useRouter();

  const [theStaffData, SettheStaffData] = useState<User>();
  const checkuser = async () => {
    const res = session!.data?.user as User;

    if (res == null) {
      SettheStaffData(undefined);
    } else {
      SettheStaffData({
        id: res?.id!,
        name: res?.name!,
        email: res?.email!,
        emailVerified: res?.emailVerified!,
        image: res?.image!,
        isManager: res?.isManager,
        CardVocabularySelfData: [],
      });
    }
  };

  useEffect(() => {
    checkuser();
    function handleClick(e: any) {
      const d = document.querySelectorAll(".sidebar ul li");
      d.forEach((x) => {
        x.classList.remove("active");
      });
    }

    const d = document.querySelectorAll(".sidebar ul li");
    d.forEach((x) => {
      x.addEventListener("click", (e) => handleClick(e));
    });
    //window.addEventListener("click", handleClick);
    return () => {
      //window?.removeEventListener("click", handleClick, { capture: true });
      d.forEach((x) => {
        x.removeEventListener("click", (e) => handleClick(e));
      });
    };
  }, [session.status]);

  const handle2 = (e: Element) => {
    e.classList.add("active");
  };
  const sideBarcontroller = () => {
    const d = document.querySelector(".sidebar");
    //  console.log(d);
    if (d?.classList.contains("active") == true) {
      d?.classList.remove("active");
    } else {
      d?.classList.add("active");
    }
  };
  return (
    <div className="main-container d-flex">
      <div className="sidebar " id="side_nav">
        <div className="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
          <h1 className="fs-4">
            <span className="text-white">日文學習網站</span>
          </h1>
          <button
            className="btn  d-block close-btn px-1 py-0 text-white d-md-none"
            onClick={sideBarcontroller}
          >
            <i className="bi bi-card-list"></i>
          </button>
        </div>

        <ul className="list-unstyled px-2">
          <li
            className=""
            onClick={(e) => {
              handle2(e.currentTarget);
            }}
          >
            <a
              className="text-decoration-none px-3 py-2 d-block"
              onClick={() => {
                router.push("/");
                sideBarcontroller();
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-house"></i> 首頁
            </a>
          </li>
          <li
            className=""
            onClick={(e) => {
              handle2(e.currentTarget);
            }}
          >
            <a
              onClick={() => {
                router.push("/page/questionMain");
                sideBarcontroller();
              }}
              className="text-decoration-none px-3 py-2 d-block"
              style={{ cursor: "pointer" }}
            >
              <i className="fal fa-list"></i>
              單字練習
            </a>
          </li>

          {theStaffData != undefined && theStaffData.isManager ? (
            <li
              className=""
              onClick={(e) => {
                handle2(e.currentTarget);
              }}
            >
              <a
                onClick={() => {
                  router.push("/page/vocabularyManager");
                  sideBarcontroller();
                }}
                className="text-decoration-none px-3 py-2 d-block d-flex justify-content-between"
                style={{ cursor: "pointer" }}
              >
                <span>
                  <i className="fal fa-comment"></i> 共用題目管理
                </span>
              </a>
            </li>
          ) : null}

          <li
            className=""
            onClick={(e) => {
              handle2(e.currentTarget);
            }}
          >
            <a
              className="text-decoration-none px-3 py-2 d-block"
              onClick={() => {
                router.push("/page/myVocabularyManage");
                sideBarcontroller();
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="fal fa-envelope-open-text"></i> 單字庫管理
            </a>
          </li>
          <li
            className=""
            onClick={(e) => {
              handle2(e.currentTarget);
            }}
          >
            <a
              className="text-decoration-none px-3 py-2 d-block"
              onClick={() => {
                router.push("/page/myVocabulary");
                sideBarcontroller();
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="fal fa-users"></i>
              單字練習
            </a>
          </li>
        </ul>
        <hr className="h-color mx-2" style={{ color: "white" }} />

        <ul className="list-unstyled px-2">
          <li className="">
            <a
              href="#"
              className="text-decoration-none px-3 py-2 d-block"
              onClick={() => router.push("/page/vocabularyManager")}
            >
              <i className="fal fa-bars"></i>
              共用題目管理(開發用)
            </a>
          </li>
          {theStaffData != undefined ? (
            <li className="">
              <a
                href="#"
                className="text-decoration-none px-3 py-2 d-block"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <i className="fal fa-bars"></i>
                登出
              </a>
            </li>
          ) : (
            <li className="">
              <a
                href="#"
                className="text-decoration-none px-3 py-2 d-block"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <i className="fal fa-bars"></i>
                Google 登入
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="content">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container-fluid">
            <div className="d-flex justify-content-between d-md-none d-block">
              <button
                className="btn px-1 py-0 open-btn me-2"
                onClick={sideBarcontroller}
              >
                <i className="bi bi-card-list"></i>
              </button>
              <a className="navbar-brand fs-4" href="#">
                <span className="bg-dark rounded px-2 py-0 text-white">
                  日文學習網站
                </span>
              </a>
              <div>
                {theStaffData != undefined ? (
                  <div>{theStaffData.name}</div>
                ) : (
                  <div>登入</div>
                )}
              </div>
            </div>
            <button
              className="navbar-toggler p-0 border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fal fa-bars"></i>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    {theStaffData != undefined ? (
                      <div>{theStaffData.name}</div>
                    ) : (
                      <div>登入</div>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="dashboard-content px-3 pt-4">{child}</div>
      </div>
    </div>
  );
}
/*
 <h2 className="fs-5"> Dashboard</h2>
 <span className="bg-dark rounded-pill text-white py-0 px-2">
                02
              </span>
               */
