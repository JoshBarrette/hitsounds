import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log(await req.formData());
    return NextResponse.json({ data: "y0" });
}
