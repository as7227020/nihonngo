import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
//申請加班
export async function PUT(
  request: Request,
  { params }: { params: { dataId: string } }
) {
  const body = await request.json();
  const {
    question,
    answer,
    supperUser,
    note,
    isShow,
    translateStr,
    vocabularyType,
  } = body.inputDataBody;

  //console.log(theDate);

  let nowDateData = new Date();
  //console.log("現在時間"+nowDateData );
  nowDateData.setUTCHours(nowDateData.getUTCHours() + 8);

  const dataId = params.dataId;
  console.log(dataId);
  try {
    const getData = await prisma.cardVocabularyData.findUnique({
      where: {
        id: dataId,
      },
    });

    if (getData == null) {
      return NextResponse.json({
        status: 401,
        message: "沒有該ID的單字資料",
        data: null,
      });
    }

    const res = await prisma.cardVocabularyData.update({
      where: {
        id: dataId,
      },
      data: {
        question: question,
        answer: answer,
        translateStr: translateStr,
        supperUser: supperUser,
        vocabularyType: vocabularyType,
        note: note,
        isShow: isShow,
        createDT: nowDateData,
      },
    });
    //let passData = res.
    return NextResponse.json({
      status: 200,
      message: "OK",
      data: res,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "發生異常錯誤",
      data: null,
    });
  }
}
