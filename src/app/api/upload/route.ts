import { NextRequest, NextResponse } from "next/server";
import { fileData } from "~/app/upload/page";
import { s3Put } from "~/s3";
import { db } from "~/server/db";

type uploadSuccess = {};

type uploadFail = {};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const fileCount = parseInt(formData.get("fileCount") as string);
    const userId = formData.get("userId") as string;
    const responses = new Array<uploadSuccess | uploadFail>();

    // Check if the user exists in the db. If not, add them
    let user = await db.user.findFirst();
    if (user === null) {
        // create new user
        user = await db.user.create({
            data: {
                userID: userId,
            },
        });
    }

    for (let i = 0; i < fileCount; i++) {
        const currentFileData = formData.get(`file-${i}`) as File;
        const currentFileName = formData.get(`file-${i}-name`) as string;
        const currentFileType = formData.get(`file-${i}-type`) as string;
        const currentFileDescription = formData.get(
            `file-${i}-description`
        ) as string; // = null if no description
        const currentURLNameExtension = currentFileName.replaceAll(" ", "+");

        // TODO: Verify everything in request and err for each of them
        if (
            currentFileData.type !== "audio/wav" ||
            (currentFileType !== "hit" && currentFileType !== "kill")
        ) {
            continue;
        }
        continue;

        // Check if the user has a sound with the given name already and err if so

        // Add the sound to the db
        const soundCreateResponse = await db.sound.create({
            data: {
                title: currentFileName,
                description: currentFileDescription,
                url: `https://hitsounds-tf.s3.amazonaws.com/${user?.id}-${currentURLNameExtension}`,
                soundType: currentFileType,
                uploaderId: user?.id,
            },
        });

        // Upload file to s3. S3 key: `https://hitsounds-tf.s3.amazonaws.com/${User.id}-${currentFile.name}`
        const s3Response = await s3Put(
            `${user?.id}-${currentURLNameExtension}`,
            currentFileData
        );

        // Add success to responses array
    }

    // Return the sound objects (or maybe part of them) to update the upload page
    return NextResponse.json(responses);
}
