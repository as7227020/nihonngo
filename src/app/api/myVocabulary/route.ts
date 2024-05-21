import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";
import { CardVocabularySelfData } from "@prisma/client";

//使用者學習到的資料
export async function PUT(request: Request, response: Response) {
  try {
    // const res = await prisma.cardVocabularyData.findMany();

    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User; //當session?.user有值時才會被轉成User類
    //沒有登入就隨機返回

    const body = await request.json();
    const { passCardId, addPint } = body.inputDataBody;

    //已經記得類型
    let passCardIds: string[] = passCardId;
    console.log(passCardId, addPint);
    // return NextResponse.json({
    //   status: 403,
    //   message: "測試看資料用",
    //   data: null,
    // });

    if (user == null) {
      return NextResponse.json({
        status: 403,
        message: "身分異常, 沒有登入",
        data: null,
      });
    }
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        CardVocabularySelfData: true,
      },
    });

    let theSelfData: CardVocabularySelfData[] =
      userData?.CardVocabularySelfData!;

    if (theSelfData.length! >= 1) {
      const randomRecords = await Promise.all(
        theSelfData.map(async (data) => {
          if (passCardIds.includes(data.id)) {
            return await prisma.cardVocabularySelfData.update({
              where: {
                id: data.id,
              },
              data: {
                nowMemoryValue: data.nowMemoryValue + addPint,
              },
            });
          }
        })
      );

      return NextResponse.json({
        status: 200,
        messgae: "完成",
        data: randomRecords,
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
