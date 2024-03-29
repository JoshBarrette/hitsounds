"use client";
import Uploader from "./_components/Uploader";
import FilesContextProvider from "./_components/FilesContext";
import SoundsUploadList from "./_components/SoundUploadList";

export type fileData = {
    file: File;
    type: "hit" | "kill";
    name: string;
    description?: string;
    response?: string;
    disabled: boolean;
};

export default function Upload() {
    return (
        <div className="flex min-h-screen w-full">
            <div className="mx-auto">
                <p className="mt-4 text-center text-4xl font-medium text-white">
                    Upload
                </p>
                <FilesContextProvider>
                    <Uploader />
                    <SoundsUploadList />
                </FilesContextProvider>
            </div>
        </div>
    );
}
