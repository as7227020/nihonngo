import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  console.log("全使用者資料:");

  //let retData
  //console.log(request);

  let StaffIdList: string[] = [];

  if (request.body == null) {
    console.log("body為空");
    return NextResponse.json({ status: 401, messgae: "沒有要增加的資料" });
  } else {
    const body = await request.json();
    console.log("body");
    StaffIdList = body.staffIdCollect;
    console.log(StaffIdList);
  }

  try {
    //拿全部員工資料
    // const res = await prisma.user.create({
    //   data: {
    //     userId: "test",
    //     email: "",
    //     emailVerified: new Date(),
    //     password: "e",
    //     loginType: "1",
    //   },
    // });
    //   console.log(res);
    return NextResponse.json({ status: 200, messgae: "成功", data: null });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      messgae: "發生異常錯誤",
      data: null,
    });
  }
}
