"use client";
import React, {useState} from 'react';
import FunnelUpload from "@/features/funnel/components/funnel-upload";
import FunnelPagination from "@/features/funnel/components/funnel-pagination";

const FunnelPreview = () => {

    const [funnel, setFunnel] = useState<Funnel | null>()
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    return (
        <div>
            <div className={"mb-5"}>
                <FunnelUpload onUpload={(funnel) => {
                    setFunnel(funnel);
                    setCurrentPageIndex(0)
                }}/>
            </div>
            {funnel &&
                <>
                    <div className={"text-xl my-2"}>{funnel?.name}</div>
                    <div className="w-[375px] h-[600px] overflow-y-auto p-4 justify-center"
                         style={{backgroundColor: funnel.bgColor}}>

                        <div className="flex justify-center mb-4">
                        </div>
                        {funnel && funnel.pages[currentPageIndex].blocks?.map(renderBlock)}
                    </div>
                </>
            }


            {funnel && funnel?.pages.length > 0 &&
                <FunnelPagination setCurrentPageIndex={setCurrentPageIndex} currentPageIndex={currentPageIndex}
                                  totalPages={funnel.pages.length}/>
            }

        </div>
    );
};

export default FunnelPreview;

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
                <img
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
                            <img src={item?.src} alt="" width={24} height={24} className="mr-3"/>
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
