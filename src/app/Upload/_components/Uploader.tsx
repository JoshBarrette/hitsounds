import { ChangeEvent, DragEvent, FormEvent, createRef, useState } from "react";
import { fileData } from "../page";
import { useUser } from "@clerk/nextjs";
import { useFileContext } from "./FilesContext";
import { MAX_FILE_SIZE, MAX_NAME_SIZE } from "~/app/api/upload/route";

export default function Uploader() {
    const { files, setFiles, submitting, setSubmitting } = useFileContext();
    const inputRef = createRef<HTMLInputElement>();
    const dropZoneRef = createRef<HTMLInputElement>();
    const user = useUser();

    function clickInput() {
        if (!submitting) inputRef.current?.click();
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files === null || submitting) return;

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
                    disabled: false,
                });
            }
        }

        setFiles(newFiles);
    }

    function verifyFiles(): boolean {
        for (let i = 0; i < files.length; i++) {
            if (files.at(i)?.file.type !== "audio/wav") {
                alert(
                    `Sound #${
                        i + 1
                    } is not the correct file type. The file must be a .wav file.`
                );
                return true;
            } else if (
                files.at(i)?.name === undefined ||
                files.at(i)?.name === "" ||
                files.at(i)?.name === null
            ) {
                alert(`Sound #${i + 1} must have a name.`);
                return true;
            } else if (
                (files.at(i)?.file.name.length as number) > MAX_NAME_SIZE
            ) {
                alert(
                    `Sound #${
                        i + 1
                    }'s name is too long. Names must be less than or equal to ${MAX_NAME_SIZE} characters long.`
                );
                return true;
            } else if ((files.at(i)?.file.size as number) > MAX_FILE_SIZE) {
                alert(
                    `Sound #${
                        i + 1
                    }'s file is too large. Files must be less than ${
                        MAX_FILE_SIZE / 1000
                    } kilobytes.`
                );
                return true;
            } else if (files.at(i)?.file === undefined) {
                alert(`Sound #${i + 1} does not have a file attached to it`);
                return true;
            }
        }

        return false;
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (files === undefined || files.length === 0) return;

        setSubmitting(true);

        if (verifyFiles()) {
            setSubmitting(false);
            return;
        }

        let formData = new FormData();
        formData.append("userId", user.user?.id as string);

        let count = 0;
        for (let i = 0; i < files.length; i++) {
            if (files.at(i)?.disabled) continue;

            formData.append(`file-${count}`, files.at(i)?.file as File);
            formData.append(`file-${count}-name`, files.at(i)?.name as string);
            formData.append(`file-${count}-type`, files.at(i)?.type as string);
            if ((files.at(i)?.description as string) !== undefined) {
                formData.append(
                    `file-${count}-description`,
                    files.at(i)?.description as string
                );
            }

            count++;
        }
        formData.append("fileCount", `${count}`);

        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                const arr = await res.json();
                const responses = arr.responses;
                let counter = 0;
                const newFiles = new Array<fileData>();
                files.map((file: fileData, k: number) => {
                    if (file.disabled) {
                        newFiles.push(file);
                    } else {
                        let newFile = files.at(k) as fileData;
                        newFiles.push({
                            ...newFile,
                            response: responses[counter],
                            disabled: responses[counter].includes(
                                "Successfully"
                            )
                                ? true
                                : false,
                        });
                        counter++;
                    }
                });
                setFiles(newFiles);
            })
            .catch((err) => {
                alert("Upload failed :c");
            });

        setSubmitting(false);
    }

    return (
        <div className="w-full">
            <div
                className="mx-auto mt-5 flex cursor-pointer rounded-lg border-2 border-dashed border-neutral-900 bg-cyan-500 px-48 py-16 text-center transition-all hover:bg-cyan-600 active:bg-cyan-400"
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={clickInput}
            >
                <p className="m-auto text-xl">
                    Click to browse files or drop sounds
                    <br />
                    <br />
                    👶
                </p>
            </div>
            <form className="mx-auto flex" onSubmit={handleFormSubmit}>
                <input
                    className="fixed scale-0 p-2"
                    ref={inputRef}
                    type="file"
                    onChange={handleFilesChange}
                    multiple
                />
                {files.length > 0 && (
                    <button
                        className="mx-auto mt-4 rounded-md bg-cyan-500 p-2 text-lg transition-all hover:bg-cyan-600 active:bg-cyan-400 disabled:bg-cyan-950 disabled:text-white"
                        type="submit"
                        disabled={submitting}
                    >
                        upload
                    </button>
                )}
            </form>
        </div>
    );
}
