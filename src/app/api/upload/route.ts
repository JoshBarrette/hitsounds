import { NextRequest, NextResponse } from "next/server";
import { s3Put } from "~/s3";
import { db } from "~/server/db";

export const MAX_FILE_SIZE = 100000; // 100 kilobytes
export const MAX_NAME_SIZE = 300;
export const MAX_DESCRIPTION_SIZE = 300;

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const fileCount = parseInt(formData.get("fileCount") as string);
    const userId = formData.get("userId") as string;
    const responses = new Array<string>();

    // Check if the user exists in the db. If not, add them
    let user = await db.user.findUnique({
        where: {
            userID: userId,
        },
    });
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
        const currentURLNameExtension = currentFileName.replaceAll(" ", "_");

        if (
            currentFileName === null ||
            currentFileData === null ||
            currentFileType === null
        ) {
            responses.push(
                "Make sure you providing a name, type, and file when uploading."
            );
        } else if (currentFileData.type !== "audio/wav") {
            responses.push(`${currentFileName}: Invalid file type.`);
        } else if (currentFileType !== "hit" && currentFileType !== "kill") {
            responses.push(`${currentFileName}: Invalid sound type.`);
        } else if (currentFileData.size > MAX_FILE_SIZE) {
            responses.push(
                `${currentFileName}: File too large. Must be less than ${MAX_FILE_SIZE} bytes.`
            );
        } else if (currentFileName.length > MAX_NAME_SIZE) {
            responses.push(
                `${currentFileName}: File name too long. Must be less than or equal to ${MAX_NAME_SIZE} characters.`
            );
        } else if (currentFileDescription !== null) {
            if (currentFileDescription.length > MAX_DESCRIPTION_SIZE) {
                responses.push(
                    `${currentFileName}: File description too long. Must be less than or equal to ${MAX_NAME_SIZE} characters.`
                );
            }
        }

        // Check if the user has a sound with the given name already and err if so
        const uniqueSound = await db.sound.findMany({
            where: {
                title: currentFileName,
                uploaderId: user.id,
            },
        });
        if (uniqueSound.length > 0) {
            responses.push(
                `${currentFileName}: You have already uploaded a sound with that name.`
            );
            continue;
        }

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
        let success = true;
        await s3Put(
            `${user?.id}-${currentURLNameExtension}`,
            currentFileData
        ).catch(async (err) => {
            await db.sound.delete({
                where: {
                    id: soundCreateResponse.id,
                },
            });
            responses.push("Error when uploading file.");
            success = false;
        });

        if (success){
            responses.push(`${currentFileName}: Successfully uploaded.`);
        }
    }

    // Return the sound objects (or maybe part of them) to update the upload page
    return NextResponse.json({ responses: responses });
}
