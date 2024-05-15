import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  console.log("全使用者資料:");
  const body = await request.json();
  const { question, answer, supperUser, note, isShow, translateStr } =
    body.inputData;
  //let retData
  //console.log(request);

  let StaffIdList: string[] = [];

  try {
    let nowDateData = new Date();
    //console.log("現在時間"+nowDateData );
    // nowDateData.setUTCHours(nowDateData.getUTCHours() + 8);

    const currentCount = await prisma.cardVocabularyData.aggregate({
      _count: {
        _all: true,
      },
    });
    const addIndex = currentCount._count._all + 1;
    const add = await prisma.cardVocabularyData.create({
      data: {
        index: addIndex,
        question: question,
        answer: answer,
        translateStr: translateStr,
        supperUser: supperUser,
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

export async function GET(request: Request, response: Response) {
  console.log("全使用者資料:");
  //console.log(request);

  try {
    const res = await prisma.cardVocabularyData.findMany();
    //const res = await prisma.user.findFirst({ skip: 0 });

    //   console.log(res);
    return NextResponse.json({ status: 200, message: "成功", data: res });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      messgae: "發生異常錯誤",
      data: null,
    });
  }
}
