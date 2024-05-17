"use client";

import { User } from "@/app/types/type";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

export const GetUserData = async (isShowMsg: boolean = false) => {
  const session = await getSession();
  let user = session?.user as User; //當session?.user有值時才會被轉成User類
  //console.log("checkuser");
  //console.log(user);

  if (user == null) {
    //console.log("因已登入被驅離");
    if (isShowMsg) {
      toast.error("請先登入使用者。");
    }

    //redirect('/');
    return null;
  } else {
    let userId = user.id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
    );
    const resData: User = await response.json();

    // console.log("GetUserData script");
    // console.log(resData);
    return resData;
  }
};
