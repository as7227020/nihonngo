"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "./navbarUI.css";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GetUserData } from "../../user/getUserData";
import LoadingView from "../loadingView";
import { User } from "@/app/types/type";

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
              <a className="nav-link" href="#">
                單字打拼
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
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
