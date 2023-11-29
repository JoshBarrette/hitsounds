import { ChangeEvent, createRef, useEffect } from "react";
import { useFileContext } from "./FilesContext";

export default function SoundToUpload(props: { index: number }) {
    const { files, setFiles, submitting } = useFileContext();
    const nameRef = createRef<HTMLInputElement>();
    const typeHitRef = createRef<HTMLInputElement>();
    const typeKillRef = createRef<HTMLInputElement>();
    const file = files[props.index];
    const shouldDisable = submitting || file.disabled;

    useEffect(() => {
        if (nameRef.current !== null) {
            nameRef.current.value = files[props.index].name;
        }
        if (typeHitRef.current !== null && typeKillRef.current !== null) {
            if (files[props.index].type === "hit") {
                typeHitRef.current.checked = true;
            } else {
                typeKillRef.current.checked = true;
            }
        }
    });

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        file.type = e.target.id === "hit" ? "hit" : "kill";
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        file.name = e.target.value;
    }

    function handleSoundRemove(i: number) {
        const newArr = [...files];
        newArr.splice(props.index, 1);
        setFiles(newArr);
    }

    return (
        <div className="my-2 flex-box rounded-md bg-purple-400 px-2 py-1">
            <div className="m-auto flex">
                <label htmlFor={`name-${props.index}`} className="my-auto mr-2">
                    {props.index + 1}:
                </label>
                <input
                    className="w-96 rounded-sm bg-blue-300 text-center leading-8 text-black placeholder:text-neutral-500"
                    type="text"
                    id={`name-${props.index}`}
                    defaultValue={file.name}
                    maxLength={120}
                    onChange={handleNameChange}
                    ref={nameRef}
                    placeholder="Please enter a name"
                    disabled={shouldDisable}
                />
                <div className="my-auto ml-4">
                    <input
                        type="radio"
                        id={`hit-${props.index}`}
                        name={`soundType-${props.index}`}
                        value="hit"
                        onChange={handleRadioChange}
                        defaultChecked={true}
                        ref={typeHitRef}
                        disabled={shouldDisable}
                    />
                    <label htmlFor={`hit-${props.index}`} className="ml-2">
                        hitsound
                    </label>
                    <input
                        type="radio"
                        id={`kill-${props.index}`}
                        name={`soundType-${props.index}`}
                        value="kill"
                        className="ml-2"
                        onChange={handleRadioChange}
                        ref={typeKillRef}
                        disabled={shouldDisable}
                    />
                    <label htmlFor={`kill-${props.index}`} className="ml-2">
                        killsound
                    </label>
                </div>
                <button
                    className="ml-4 rounded-md bg-red-600 px-3 py-1 text-white disabled:bg-red-950"
                    onClick={() => handleSoundRemove(props.index)}
                    disabled={shouldDisable}
                >
                    remove
                </button>
            </div>

            <p className="w-full text-center p-1 text-md">
                {files.at(props.index)?.response}
            </p>
        </div>
    );
}
