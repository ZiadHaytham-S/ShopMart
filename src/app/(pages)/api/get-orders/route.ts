import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const response = await fetch(`${process.env.URL_API}/orders/user/${userId}`);
  const data = await response.json();

  return NextResponse.json(data);
}
