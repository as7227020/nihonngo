import prisma from "@/app/lib/prisma";
import { UserLearnData } from "@prisma/client";
import { Numans } from "next/font/google";
import { NextResponse } from "next/server";
//已經學會的更新
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.json();
  const { question } = body.inputDataBody;

  //console.log(theDate);

  const userId = params.userId;
  console.log(userId);
  console.log(question);
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const newPassData: number[] = [];
    const thePassData: string[] = question;
    thePassData.forEach((e) => {
      newPassData.push(Number.parseInt(e));
    });
    let nowPassData = res?.userLearnDataId;

    if (nowPassData == "-1") {
      console.log("第一次");
      //第一次時 未建立關聯資料時
      let newData: UserLearnData = {
        id: userId,
        PassVocabularyIndexList: newPassData,
        theUserCustomizationType: [],
      };
      const updateData = await prisma.userLearnData.create({
        data: newData,
      });

      const updateUser = await prisma.user.update({
        where: {
          id: res?.id,
        },
        data: {
          userLearnDataId: updateData.id,
        },
      });

      return NextResponse.json({
        status: 200,
        message: "OK",
        data: updateData,
      });
    } else {
      const recordData = await prisma.userLearnData.findUnique({
        where: { id: nowPassData },
      });
      if (recordData != null) {
        console.log("第二次");

        //重複的不要再增加
        let addToFixData: number[] = [];
        newPassData.forEach((e) => {
          if (recordData.PassVocabularyIndexList.includes(e) == false) {
            addToFixData.push(e);
          }
        });

        //目前紀錄和要新加的
        const fixPassData =
          recordData.PassVocabularyIndexList.concat(addToFixData);
        const updateData = await prisma.userLearnData.update({
          where: {
            id: recordData.id,
          },
          data: {
            PassVocabularyIndexList: fixPassData,
          },
        });
        return NextResponse.json({
          status: 200,
          message: "OK",
          data: updateData,
        });
      } else {
        console.log("未連接");
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "發生異常錯誤",
      data: null,
    });
  }
}
