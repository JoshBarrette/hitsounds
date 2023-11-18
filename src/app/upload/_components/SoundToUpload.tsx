import { soundData } from "../page";

export default function SoundToUpload(props: { file: File; data: soundData }) {
    return (
        <div className="flex">
            <p>{props.data.name}</p>
            <p className="pl-10">{props.data.type}</p>
        </div>
    );
}
