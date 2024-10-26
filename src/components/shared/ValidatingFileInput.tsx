import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";

export type ValidatingFileInputProps = {
    onFileSelected: (name: string, data: string) => void;
    validCallback: (valid: boolean) => void;
}

export const ValidatingFileInput: FunctionComponent<ValidatingFileInputProps> = (props) => {
    const [currentFile, setCurrentFile] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const fileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            console.log(files[0])
            setCurrentFile(files[0].name)
            const data = await files[0].text();
            props.onFileSelected(files[0].name, data)
            props.validCallback(data.length > 0 && files[0].name.endsWith('.gpx'))
        }
        else {
            props.onFileSelected('', '')
            props.validCallback(false)
        }
    }

    return <div className="flex flex-row items-center">
        <Button onClick={() => inputRef.current?.click()}>
            {
                currentFile === '' ?
                    <div>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;
                        Add File
                    </div>
                    :
                    <div>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
            }
            <input onChange={fileSelected} className="hidden" ref={inputRef} accept=".gpx" type='file' />
        </Button>
        <div>
            { currentFile }
        </div>
    </div>
}