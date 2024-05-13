import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User; //當session?.user有值時才會被轉成User類

  return <div>登入畫面 userName : {user.userName}</div>;
}
