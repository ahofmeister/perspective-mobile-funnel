"use client"
import React, {useRef, useState} from 'react';
import {Upload} from "lucide-react";

const FunnelUpload = (props: { onUpload: (file: Funnel) => void }) => {

    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileName(file.name)
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string)
                    if (json && Object.keys(json).length > 0) {
                        props.onUpload(json);
                        setErrorMessage('')
                    } else {
                        setErrorMessage("JSON is empty")
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error)
                    setErrorMessage(`Could not parse json file ${file.name}`)
                }
            }
            event.target.value = ""
            reader.readAsText(file)
        }
    }

    return (
        <div>
            <input
                type="file"
                accept=".json"
                onInput={handleFileChange}
                className="sr-only"
                ref={fileInputRef}
            />

            <button
                className="mb-2 w-full flex items-center justify-center py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
                onClick={() => fileInputRef.current?.click()}>

                <Upload size={20} className="mr-2"/>

                <span>{fileName || 'Choose Funnel JSON'}</span>
            </button>

            <span className={"text-red-600"}>{errorMessage && (errorMessage)}</span>
        </div>
    )
};

export default FunnelUpload;