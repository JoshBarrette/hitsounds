import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { fileData } from "../page";

interface FilesContextState {
    files: fileData[];
    setFiles: Dispatch<SetStateAction<fileData[]>>;
    submitting: boolean;
    setSubmitting: Dispatch<SetStateAction<boolean>>;
}

export const FileContext = createContext<FilesContextState | undefined>(
    undefined
);

export default function FilesContextProvider(props: { children: ReactNode }) {
    const [filesState, setFilesState] = useState<Array<fileData>>(
        new Array<fileData>()
    );
    const [submitting, setSubmitting] = useState(false);

    const providerValues: FilesContextState = {
        files: filesState,
        setFiles: setFilesState,
        submitting: submitting,
        setSubmitting: setSubmitting,
    };

    return (
        <FileContext.Provider value={providerValues}>
            {props.children}
        </FileContext.Provider>
    );
}

export function useFileContext() {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error(
            "useFileContext must be used within a FilesContextProvider"
        );
    }
    return context;
}
