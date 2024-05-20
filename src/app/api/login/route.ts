import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
    return NextResponse.json("hello", {status:200})
}