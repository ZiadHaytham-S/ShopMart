import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken()
  const response = await fetch(
          `${process.env.URL_API}/wishlist`,
          {
            headers: {
              token: token+'',
            },
            cache: "no-store",
          }
        );
        const data = await response.json()
        return NextResponse.json(data)
}