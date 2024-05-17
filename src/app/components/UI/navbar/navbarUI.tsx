"use client";
import { signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "./navbarUI.css";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GetUserData } from "../../user/getUserData";
import LoadingView from "../loadingView";
import { User } from "@/app/types/type";
import { GetIsAdmin } from "@/app/bsData";

const NavbarUI = () => {
  const [loadingViewController, SetloadingViewController] = useState(false);
  const page = usePathname();
  const router = useRouter();
  const [theStaffData, SettheStaffData] = useState<User>();
  const checkuser = async () => {
    GetUserData(false).then((data) => {
      if (data == null) {
        // if (page == "/register") {
        //   //如果再register畫面不移動
        // } else {
        //   router.push("/login");
        // }
      } else {
        SettheStaffData({
          id: data.id!,
          name: data.name!,
          email: data.email!,
          emailVerified: data.emailVerified!,
          image: data.image!,
          isManager: data.isManager,
          UserLearnData: data.UserLearnData,
          CardVocabularySelfData: data.CardVocabularySelfData,
        });
        //  router.push("/page/loginView");
      }
    });
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    checkuser();
    const onScroll = () =>
      setOffset(
        Number(
          (window.scrollY /
            (document.documentElement.offsetHeight - window.innerHeight)) *
            100
        )
      );
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    require("bootstrap/dist/js/bootstrap.bundle.js");
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const GetView = () => {
    return (
      <div className="container d-flex">
        <a
          className="navbar-brand"
          onClick={() => router.push("/")}
          style={{
            cursor: "pointer",
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              letterSpacing: "3px",
              color: "#302f2f",
            }}
          >
            日文學習網站
            {/*theStaffData == null ? "---" : theStaffData!.name*/}
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                首頁
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/page/loginView">
                單字練習
              </a>
            </li>

            {theStaffData != undefined &&
            (GetIsAdmin(theStaffData.name) || theStaffData.isManager) ? (
              <li className="nav-item">
                <a className="nav-link" href="/page/vocabularyManager">
                  單字管理
                </a>
              </li>
            ) : null}

            {theStaffData != undefined ? (
              <li className="nav-item">
                <button
                  onClick={() => {
                    signOut();
                  }}
                  style={{
                    border: "none",
                  }}
                >
                  登出
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  onClick={() => {
                    signIn();
                  }}
                  style={{
                    border: "none",
                  }}
                >
                  登入
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <LoadingView viewSwitch={loadingViewController} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-sticky-in mb-3">
        {GetView()}
      </nav>
      {offset > 0.5 && (
        <nav
          className={
            offset > 0.5
              ? "navbar navbar-expand-lg navbar-light bg-light fixed-top navbar-sticky-in"
              : "navbar navbar-expand-lg navbar-light bg-light fixed-top navbar-sticky-in-out"
          }
        >
          {GetView()}
        </nav>
      )}
    </div>
  );
};

export default NavbarUI;
