import { ChangeEvent, createRef, useEffect } from "react";
import { useFileContext } from "./FilesContext";

export default function SoundToUpload(props: { index: number }) {
    const { files, setFiles } = useFileContext();
    const nameRef = createRef<HTMLInputElement>();
    const typeHitRef = createRef<HTMLInputElement>();
    const typeKillRef = createRef<HTMLInputElement>();
    const file = files[props.index];

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
        console.log(newArr);
        setFiles(newArr);
    }

    return (
        <div className="my-2 flex">
            <label htmlFor={`name-${props.index}`} className="my-auto mr-2">
                name
            </label>
            <input
                className="w-96 rounded-sm bg-blue-300 text-center leading-8 text-black"
                type="text"
                id={`name-${props.index}`}
                defaultValue={file.name}
                maxLength={120}
                onChange={handleNameChange}
                ref={nameRef}
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
                />
                <label htmlFor={`kill-${props.index}`} className="ml-2">
                    killsound
                </label>
            </div>
            <button
                className="ml-4 rounded-md bg-red-600 px-3 py-1 text-white"
                onClick={() => handleSoundRemove(props.index)}
            >
                remove
            </button>
        </div>
    );
}
