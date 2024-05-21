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
    supperUser,
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

export async function GET(request: Request, response: Response) {
  try {
    // const res = await prisma.cardVocabularyData.findMany();

    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User; //當session?.user有值時才會被轉成User類
    console.log("user");
    console.log(user);
    console.log("user2");
    //沒有登入就隨機返回

    //已經學習過的index
    let bePassData: number[] = [];
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
      // console.log("getUserLearnData");
      // console.log(getUserLearnData);
      bePassData = getUserLearnData?.PassVocabularyIndexList!;
    }

    //const res = await prisma.user.findFirst({ skip: 0 });
    const currentCount = await prisma.cardVocabularyData.aggregate({
      _count: {
        _all: true,
      },
    });

    //過濾掉使用者已經學過的
    let fillerBePassData: number[] = [];
    for (let index = 0; index < currentCount._count._all; index++) {
      if (bePassData.includes(index + 1) == false) {
        fillerBePassData.push(index + 1);
      }
    }
    console.log("剩下要被隨機選的");
    console.log(fillerBePassData);

    let getLength = 3;
    if (getLength > fillerBePassData.length) {
      getLength = fillerBePassData.length;
    }
    let nowSelect: number[] = [];

    while (nowSelect.length < getLength) {
      const randomIndex =
        fillerBePassData[Math.floor(Math.random() * fillerBePassData.length)];
      if (nowSelect.includes(randomIndex) == false) {
        nowSelect.push(randomIndex);
        console.log("拿取index : " + randomIndex);
      }
    }
    console.log("最後要拿的");
    console.log(nowSelect);

    const randomRecords = await Promise.all(
      nowSelect.map(async (index) => {
        return await prisma.cardVocabularyData.findFirst({
          skip: index - 1,
        });
      })
    );
    console.log("返回");
    console.log(randomRecords);
    return NextResponse.json({
      status: 200,
      message: "成功",
      data: randomRecords,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      messgae: "發生異常錯誤",
      data: null,
    });
  }
}
