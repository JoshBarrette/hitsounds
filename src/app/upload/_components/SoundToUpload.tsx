import { fileData } from "../page";

export default function SoundToUpload(props: { fileData: fileData }) {
    return (
        <div className="flex">
            <p>{props.fileData.name}</p>
            <p className="pl-10">{props.fileData.type}</p>
        </div>
    );
}
