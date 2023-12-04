import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    DeleteObjectCommand,
    DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { MAX_FILE_SIZE } from "~/app/api/upload/constants";
import { SoundType } from "~/server/db";

const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
const REGION = process.env.S3_REGION as string;
const BUCKET_NAME = process.env.S3_BUCKET as string;

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

export async function s3Put(key: string, file: File): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        if (file.type !== "audio/wav") reject("Invalid file type.");
        else if (file.size > MAX_FILE_SIZE) reject("File too large.");

        const bucketParams: PutObjectCommandInput = {
            Body: new Uint8Array(await file.arrayBuffer()),
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: file.type,
        };

        let data;
        try {
            data = await s3Client.send(new PutObjectCommand(bucketParams));
            resolve(true);
        } catch (err) {
            console.log("Error", err);
            reject(false);
        }
    });
}

export async function s3Delete(sound: SoundType): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const bucketParams: DeleteObjectCommandInput = {
            Bucket: BUCKET_NAME,
            Key: sound.url.split(".com/")[1],
        };

        let data;
        try {
            data = await s3Client.send(new DeleteObjectCommand(bucketParams));
            resolve(true);
        } catch (err) {
            console.log("Error", err);
            reject(false);
        }
    });
}
