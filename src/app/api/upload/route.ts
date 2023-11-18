import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let formData = await req.formData();
    let file = formData.get("file") as File;
    let fileName = file.name;
    console.log(fileName);
    return NextResponse.json({ data: "y0" });
}
