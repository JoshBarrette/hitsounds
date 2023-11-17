"use server";

export async function uploadAction(data: { file: File | null }) {
    console.log(data.file);
    return data.file !== null;
}
