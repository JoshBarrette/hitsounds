import { useFileContext } from "./FilesContext";

export default function SoundToUpload(props: {
    index: number;
}) {
    const { files, setFiles } = useFileContext();
    const file = files[props.index];

    return (
        <div className="flex">
            <p>{file.name}</p>
            <p className="pl-10">{file.type}</p>
        </div>
    );
}
