import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
//購買的歷史訊息取得API
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  // console.log("userId");
  // console.log(userId);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        CardVocabularySelfData: true,
      },
    });
    console.log(user);

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
