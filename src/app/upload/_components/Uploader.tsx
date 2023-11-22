import { ChangeEvent, DragEvent, FormEvent, createRef, useState } from "react";
import { fileData } from "../page";
import { useUser } from "@clerk/nextjs";
import { useFileContext } from "./FilesContext";

export default function Uploader() {
    const { files, setFiles } = useFileContext();
    const inputRef = createRef<HTMLInputElement>();
    const dropZoneRef = createRef<HTMLInputElement>();
    const [submitted, setSubmitted] = useState(false);
    const user = useUser();

    function clickInput() {
        inputRef.current?.click();
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files === null) return;

        addNewFiles(e.dataTransfer.files);
    }

    function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            setFiles(new Array<fileData>());
            return;
        }

        addNewFiles(e.target.files);
    }

    function addNewFiles(newFilesList: FileList) {
        let newFiles = new Array<fileData>();
        for (let i = 0; i < newFilesList.length; i++) {
            // TODO: also need to check file size
            if (newFilesList.item(i)?.type === "audio/wav") {
                newFiles.push({
                    file: newFilesList.item(i) as File,
                    type: "hit",
                    name: newFilesList
                        .item(i)
                        ?.name.substring(
                            0,
                            (newFilesList.item(i)?.name.length as number) - 4
                        ) as string,
                });
            }
        }

        setFiles(newFiles);
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // return;
        if (files === undefined || files.length === 0) return;

        // TODO: reenable submit button if upload gets cancelled
        setSubmitted(true);

        let formData = new FormData();
        formData.append("userId", user.user?.id as string);

        let count = 0;
        for (let i = 0; i < files.length; i++) {
            if (
                files.at(i)?.file.type === "audio/wav" &&
                files.at(i)?.file.name !== undefined
            ) {
                formData.append(`file-${count}`, files.at(i)?.file as File);
                formData.append(
                    `file-${count}-name`,
                    files.at(i)?.name as string
                );
                formData.append(
                    `file-${count}-type`,
                    files.at(i)?.type as string
                );
                if ((files.at(i)?.description as string) !== undefined) {
                    formData.append(
                        `file-${count}-description`,
                        files.at(i)?.description as string
                    );
                }

                count++;
            }
        }
        formData.append("fileCount", `${count}`);

        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        }).catch((err) => {
            // TODO: do something on upload fail
            console.error(err);
        });
    }

    return (
        <div>
            <div
                className="mx-auto h-20 w-20 cursor-pointer bg-slate-400"
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={clickInput}
            ></div>
            <form className="mx-auto flex" onSubmit={handleFormSubmit}>
                <input
                    className="fixed scale-0 p-2"
                    ref={inputRef}
                    type="file"
                    onChange={handleFilesChange}
                    multiple
                />
                <button
                    className="mx-auto rounded-md bg-red-300 p-2"
                    type="submit"
                    disabled={submitted}
                >
                    upload
                </button>
            </form>
        </div>
    );
}
