import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
//申請加班
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.json();

  //console.log(theDate);

  let nowDateData = new Date();
  //console.log("現在時間"+nowDateData );
  nowDateData.setUTCHours(nowDateData.getUTCHours() + 8);

  const userId = params.userId;
  console.log(userId);
  try {
    const res = await prisma.cardVocabularyData.findUnique({
      where: {
        id: userId,
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
