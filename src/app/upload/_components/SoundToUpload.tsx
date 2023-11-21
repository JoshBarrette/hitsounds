import { fileData } from "../page";

export default function SoundToUpload(props: { files: fileData[], index: number  }) {
    const file = props.files[props.index];

    return (
        <div className="flex">
            <p>{file.name}</p>
            <p className="pl-10">{file.type}</p>
        </div>
    );
}
