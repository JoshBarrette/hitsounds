import { ChangeEvent, FormEvent, createRef } from "react";
import { fileData } from "../page";

export default function Uploader(props: {
    files: Array<fileData>;
    setFiles: (arr: Array<fileData>) => void;
}) {
    const ref = createRef<HTMLInputElement>();

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.files === undefined) return;

        let formData = new FormData();
        // TODO: pass all the files
        formData.append("file", props.files[0].file);
        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        }).catch((err) => {
            // TODO: do something on upload fail
            console.log(err);
        });
    }

    function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            props.setFiles(new Array<fileData>());
            return;
        }

        let newFiles = new Array<fileData>();
        for (let i = 0; i < e.target.files.length; i++) {
            // TODO: also need to check file size
            if (e.target.files.item(i)?.type === "audio/wav") {
                newFiles.push({
                    file: e.target.files.item(i) as File,
                    type: "hit",
                    name: e.target.files
                        .item(i)
                        ?.name.substring(
                            0,
                            (e.target.files.item(i)?.name.length as number) - 4
                        ) as string,
                });
            }
        }

        props.setFiles(newFiles);
        console.log(newFiles);
    }

    return (
        <div>
            <form className="flex" onSubmit={handleFormSubmit}>
                <input
                    className="p-2"
                    type="file"
                    onChange={handleFilesChange}
                    ref={ref}
                    multiple
                />
                <button className="rounded-md bg-red-300 p-2" type="submit">
                    upload
                </button>
                {/* <button onClick={() => ref.current?.click()}>y0</button> */}
            </form>
        </div>
    );
}
