import { ChangeEvent, createRef, useEffect } from "react";
import { useFileContext } from "./FilesContext";
import { TextInput } from "~/app/_components/TextInput";
import { Button } from "~/app/_components/Button";

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
        <div className="flex-box my-2 rounded-md bg-neutral-500 px-3 pt-1 font-medium text-black">
            <div className="text-md m-auto mt-1 flex">
                <label htmlFor={`name-${props.index}`} className="my-auto mr-2">
                    {props.index + 1}:
                </label>
                <TextInput
                    className="w-96"
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
                <Button
                    className="ml-4 border-none bg-red-600 text-black hover:border-none disabled:bg-red-950"
                    onClick={() => handleSoundRemove(props.index)}
                    disabled={shouldDisable}
                >
                    remove
                </Button>
            </div>

            {files.at(props.index)?.response !== "" ? (
                <p className="text-md w-full p-1 text-center">
                    {files.at(props.index)?.response}
                </p>
            ) : null}
        </div>
    );
}
