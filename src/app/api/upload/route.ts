import { NextRequest, NextResponse } from "next/server";
import { s3Put } from "~/s3";

export async function POST(req: NextRequest) {
    let formData = await req.formData();
    let file = formData.get("file") as File;

    const data = await s3Put("try2.wav", file);

    return NextResponse.json({ data: "y0" });
}
