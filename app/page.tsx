"use client"
import Image from "next/image";
import ExampleFunnel from './examples/example.json';
import React, {useRef, useState} from "react";
import FunnelNavigation from "@/features/funnel/funnel-navigation";
import {Upload} from "lucide-react";


export default function Home() {

    const [funnel, setFunnel] = useState<Funnel | null>(ExampleFunnel as Funnel)
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileName(file.name)
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string)
                    setFunnel(json)
                    setCurrentPageIndex(0)
                } catch (error) {
                    console.error('Error parsing JSON:', error)
                }
            }
            reader.readAsText(file)
        }
    }

    const renderBlock = (block: FunnelBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <p
                        key={block.id}
                        style={{color: block.color, textAlign: block.align as any}}
                        className="mb-4"
                    >
                        {block.text}
                    </p>
                )
            case 'image':
                return (
                    <Image
                        key={block.id}
                        src={block.src || ''}
                        alt={block.alt || ''}
                        width={335}
                        height={200}
                        className="mb-4 rounded-md"
                    />
                )
            case 'list':
                return (
                    <ul key={block.id} className="mb-4">
                        {block.items?.map((item) => (
                            <li key={item.id} className="flex items-center mb-4">
                                <Image src={item?.src} alt="" width={24} height={24} className="mr-3"/>
                                <div>
                                    <h3 className="font-semibold text-black">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            case 'button':
                return (
                    <div
                        key={block.id}
                        className="w-full mb-4 rounded text-center p-1 font-semibold"
                        style={{color: block.color, backgroundColor: block.bgColor}}
                    >
                        {block.text}
                    </div>
                )
            default:
                return null
        }
    }


    return (
        <div
            className="flex justify-items-start justify-center  min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex gap-8">
                <div className={"flex flex-col gap-y-10"}>
                    <Image
                        src="/logo.png"
                        alt="Perspective Company Logo"
                        width={215}
                        height={215}
                        priority
                    />

                    <div className="relative w-[375px] mb-4">
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
                            onClick={() => fileInputRef.current?.click()
                            }
                        >
                            <Upload size={20} className="mr-2"/>
                            <span>{fileName || 'Choose Funnel JSON'}</span>
                        </button>
                    </div>
                </div>

                <div>
                    {funnel && <div className="w-[375px] h-[600px] overflow-y-auto p-4 justify-center"
                                    style={{backgroundColor: funnel.bgColor}}>
                        <div className="flex justify-center mb-4">
                        </div>
                        {funnel.pages[currentPageIndex].blocks?.map(renderBlock)}
                    </div>
                    }

                    {funnel && funnel?.pages.length > 0 &&
                        <FunnelNavigation setCurrentPageIndex={setCurrentPageIndex} currentPageIndex={currentPageIndex}
                                          totalPages={funnel.pages.length}/>
                    }

                </div>
            </main>
        </div>
    );
}

