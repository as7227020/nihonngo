import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/type";
import { UserLearnData } from "@prisma/client";

//增加我的單字種類
export async function POST(request: Request, response: Response) {
  try {
    // const res = await prisma.cardVocabularyData.findMany();

    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User; //當session?.user有值時才會被轉成User類
    //沒有登入就隨機返回

    const body = await request.json();
    const { addTypeStr } = body.inputDataBody;

    //已經記得類型
    let beRecordData: string[] = [];

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
    });
    if (userData?.userLearnDataId != "-1") {
      const getUserLearnData = await prisma.userLearnData.findUnique({
        where: {
          id: userData?.userLearnDataId,
        },
      });

      if (getUserLearnData?.theUserCustomizationType.length! >= 10) {
        return NextResponse.json({
          status: 401,
          message: "目前最多增加10個種類",
          data: null,
        });
      }

      const isHasRecord =
        getUserLearnData?.theUserCustomizationType.includes(addTypeStr);
      if (isHasRecord == false) {
        let recordData = getUserLearnData?.theUserCustomizationType;
        recordData?.push(addTypeStr);
        const updateUserLearnData = await prisma.userLearnData.update({
          where: {
            id: getUserLearnData?.id,
          },
          data: {
            theUserCustomizationType: recordData,
          },
        });
        return NextResponse.json({
          status: 200,
          message: "成功",
          data: updateUserLearnData,
        });
      } else {
        return NextResponse.json({
          status: 401,
          message: "已經有一樣的類型了,無法增加",
          data: getUserLearnData,
        });
      }
    } else {
      console.log("第一次");
      beRecordData.push(addTypeStr);
      //第一次時 未建立關聯資料時
      let newData: UserLearnData = {
        id: userData.id,
        PassVocabularyIndexList: [],
        theUserCustomizationType: beRecordData,
      };
      const updateData = await prisma.userLearnData.create({
        data: newData,
      });

      const updateUserData = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          userLearnDataId: updateData.id,
        },
      });

      return NextResponse.json({
        status: 200,
        message: "成功",
        data: updateData,
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

//更新類種名稱/移除種類
export async function PUT(request: Request, response: Response) {
  try {
    // const res = await prisma.cardVocabularyData.findMany();

    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User; //當session?.user有值時才會被轉成User類
    //沒有登入就隨機返回

    const body = await request.json();
    const { updateIndex, updateStr, updateAction } = body.inputDataBody;

    //已經記得類型
    let beRecordData: string[] = [];

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
    });
    if (userData == null) {
      return NextResponse.json({
        status: 403,
        message: "身分異常, 找不到使用者資料",
        data: null,
      });
    }

    if (userData?.userLearnDataId != "-1") {
      const getUserLearnData = await prisma.userLearnData.findUnique({
        where: {
          id: userData?.userLearnDataId,
        },
      });
      let updateData = getUserLearnData?.theUserCustomizationType;
      if (updateData != null) {
        const originTypeStr = updateData[Number.parseInt(updateIndex)];
        if (updateAction == "delete") {
          updateData[Number.parseInt(updateIndex)] = originTypeStr + "*";
        }
        if (updateAction == "update") {
          updateData[Number.parseInt(updateIndex)] = updateStr;
        }
      }

      const gupdateLearnData = await prisma.userLearnData.update({
        where: {
          id: userData?.userLearnDataId,
        },
        data: {
          theUserCustomizationType: updateData,
        },
      });
      return NextResponse.json({
        status: 200,
        message: "完成",
        data: gupdateLearnData,
      });
    } else {
      return NextResponse.json({
        status: 401,
        message: "需要先增加資料,才能操作",
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
