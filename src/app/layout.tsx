import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextAuthProvider } from "./lib/next-auth/provider";
import "bootstrap/dist/css/bootstrap.css";
import { Suspense } from "react";
import Loading from "../../Loading";
import "bootstrap-icons/font/bootstrap-icons.css";
import ToasterProvider from "./components/toaster/ToasterProvider";
import NavbarUI from "./components/UI/navbar/navbarUI";
import SideBarUI from "./components/sidebar/sideBarUI";

const notosansjpFont = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "日文學習網站",
  description:
    "用打的方式, 練習漢字的拼音! 幫助您在 打字時的速度 / 考試的成績 / 念法上 都有不錯的水準呦",
};
// <NavbarUI />
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <head>
        <body className={notosansjpFont.className}>
          <SideBarUI
            child={
              <NextAuthProvider>
                <Suspense fallback={<Loading />}>
                  {children}
                  <ToasterProvider />
                </Suspense>
              </NextAuthProvider>
            }
          />
        </body>
      </head>
    </html>
  );
}
