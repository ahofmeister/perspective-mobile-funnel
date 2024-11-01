"use client"
import React, {useRef, useState} from 'react';
import {Upload} from "lucide-react";

const FunnelUpload = (props: { onUpload: (file: Funnel) => void }) => {

    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileName(file.name)
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const json: Funnel = JSON.parse(e.target?.result as string)
                    props.onUpload(json)
                } catch (error) {
                    console.error('Error parsing JSON:', error)
                }
            }
            reader.readAsText(file)
        }
    }

    return (
        <div>
            <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="sr-only"
                id="file-input"
                ref={fileInputRef}
            />

            <button
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
                onClick={() => fileInputRef.current?.click()}>

                <Upload size={20} className="mr-2"/>

                <span>{fileName || 'Choose Funnel JSON'}</span>
            </button>
        </div>
    )
};

export default FunnelUpload;