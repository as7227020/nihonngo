import { getProviders } from "next-auth/react";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";

export async function POST(request: Request, response: Response) {
  console.log("全使用者資料:");
  const body = await request.json();
  const {
    question,
    answer,
    userId,
    note,
    isShow,
    translateStr,
    vocabularyType,
  } = body.inputDataBody;
  //let retData
  //console.log(request);

  let StaffIdList: string[] = [];

  try {
    let nowDateData = new Date();
    //console.log("現在時間"+nowDateData );
    // nowDateData.setUTCHours(nowDateData.getUTCHours() + 8);

    const add = await prisma.cardVocabularySelfData.create({
      data: {
        question: question,
        answer: answer,
        translateStr: translateStr,
        nowMemoryValue: 0,
        isBeMemory: false,
        userId: userId,
        vocabularyType: vocabularyType,
        note: note,
        isShow: true,
        createDT: nowDateData,
      },
    });
    return NextResponse.json({ status: 200, message: "成功", data: add });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "發生異常錯誤",
      data: null,
    });
  }
}
