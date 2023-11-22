import { ChangeEvent, DragEvent, FormEvent, createRef, useEffect } from "react";
import { fileData } from "../page";
import { useUser } from "@clerk/nextjs";

export default function Uploader(props: {
    files: Array<fileData>;
    setFiles: (arr: Array<fileData>) => void;
}) {
    const inputRef = createRef<HTMLInputElement>();
    const dropZoneRef = createRef<HTMLInputElement>();
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
            props.setFiles(new Array<fileData>());
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

        props.setFiles(newFiles);
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.files === undefined || props.files.length === 0) return;

        let formData = new FormData();
        formData.append("userId", user.user?.id as string);

        let count = 0;
        for (let i = 0; i < props.files.length; i++) {
            if (props.files.at(i)?.file.type === "audio/wav") {
                formData.append(
                    `file-${count}`,
                    props.files.at(i)?.file as File
                );
                formData.append(
                    `file-${count}-name`,
                    props.files.at(i)?.name as string
                );
                formData.append(
                    `file-${count}-type`,
                    props.files.at(i)?.type as string
                );
                if ((props.files.at(i)?.description as string) !== undefined) {
                    formData.append(
                        `file-${count}-description`,
                        props.files.at(i)?.description as string
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
            console.log(err);
        });
    }

    return (
        <div>
            <form className="flex" onSubmit={handleFormSubmit}>
                <input
                    className="fixed scale-0 p-2"
                    type="file"
                    onChange={handleFilesChange}
                    ref={inputRef}
                    multiple
                />
                <div
                    className="h-20 w-20 cursor-pointer bg-slate-400"
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={clickInput}
                ></div>
                <button className="rounded-md bg-red-300 p-2" type="submit">
                    upload
                </button>
                {/* <button onClick={() => ref.current?.click()}>y0</button> */}
            </form>
        </div>
    );
}
