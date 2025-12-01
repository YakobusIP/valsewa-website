import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // dummy user check
  if (username !== "admin" || password !== "123456") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    accessToken: "fake-access-token",
    refreshToken: "fake-refresh-token",
    username
  });
}
