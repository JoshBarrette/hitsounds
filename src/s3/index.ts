import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    DeleteObjectCommand,
    DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
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

export function generateKey() {}

export async function s3Put(key: string, file: File): Promise<number | string> {
    return new Promise<number | string>(async (resolve, reject) => {
        if (file.type !== "audio/wav") reject("Invalid file type."); // TODO: reject with real error

        const bucketParams: PutObjectCommandInput = {
            Body: new Uint8Array(await file.arrayBuffer()),
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: file.type,
        };

        let data;
        try {
            data = await s3Client.send(new PutObjectCommand(bucketParams));
            console.log(data);
            // TODO: resolve with real response
            resolve(data.$metadata.httpStatusCode as number);
        } catch (err) {
            // TODO: reject with real error
            console.log("Error", err);
            reject(data?.$metadata.httpStatusCode ?? "error in s3");
        }
    });
}

export async function s3Delete(sound: SoundType): Promise<number | string> {
    return new Promise<number | string>(async (resolve, reject) => {
        const bucketParams: DeleteObjectCommandInput = {
            Bucket: BUCKET_NAME,
            Key: sound.url.split(".com/")[1],
        };

        let data;
        try {
            data = await s3Client.send(new DeleteObjectCommand(bucketParams));
            console.log(data);
            // TODO: resolve with real response
            resolve(data.$metadata.httpStatusCode as number);
        } catch (err) {
            // TODO: reject with real error
            console.log("Error", err);
            reject(data?.$metadata.httpStatusCode ?? "error in s3");
        }
    });
}
