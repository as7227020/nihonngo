import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";

export async function GET(request: Request, response: Response) {
  try {
    // const res = await prisma.cardVocabularyData.findMany();

    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User; //當session?.user有值時才會被轉成User類

    //沒有登入就隨機返回

    if (user == null) {
      return NextResponse.json({
        status: 403,
        message: "身分異常, 沒有登入",
        data: null,
      });
    }

    //已經記得類型
    let beRecordData: string[] = [];

    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (userData?.userLearnDataId != "-1") {
      const getUserLearnData = await prisma.userLearnData.findUnique({
        where: {
          id: userData?.userLearnDataId,
        },
      });

      return NextResponse.json({
        status: 200,
        message: "成功",
        data: getUserLearnData,
      });
    } else {
      return NextResponse.json({
        status: 403,
        message: "尚未建立資料",
        data: null,
      });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      messgae: "發生異常錯誤",
      data: null,
    });
  }
}
