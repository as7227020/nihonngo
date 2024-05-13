import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function LoginView() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User; //當session?.user有值時才會被轉成User類
  if (user == null) {
    return (
      <div>
        未登入
        <Link href={"/api/auth/signin"} className="">
          server登入
        </Link>
      </div>
    );
  }

  return <div>登入畫面 : </div>;
}
