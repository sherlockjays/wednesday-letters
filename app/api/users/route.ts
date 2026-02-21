import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { nickname } = await req.json();

  if (!nickname) {
    return NextResponse.json(
      { error: "닉네임을 입력해주세요" },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { nickname } });
  if (existing) {
    return NextResponse.json(
      { error: "이미 사용중인 닉네임이에요" },
      { status: 409 },
    );
  }

  const user = await prisma.user.create({ data: { nickname } });
  return NextResponse.json(user, { status: 201 });
}
