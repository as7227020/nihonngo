import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LobbyPage from "../Lobby/page";

export default async function LoginView() {
  // const session = await getServerSession(nextAuthOptions);
  // const user = session?.user as User; //當session?.user有值時才會被轉成User類
  // if (user == null) {
  //   return (
  //     <div>
  //       未登入
  //       <Link href={"/api/auth/signin"} className="">
  //         登入
  //       </Link>
  //     </div>
  //   );
  // }
  //  登入畫面 : {user.name} ID: {user.id}   <Image width={50} height={50} alt="profile_icon" src={user?.image} />
  /*
   <Link href={"/api/auth/signout?callbackUrl=/"} className="">
        登出
      </Link>
  */
  return (
    <div>
      <LobbyPage />
    </div>
  );
}
