import Image from "next/image";
import React from "react";
import FunnelPreview from "@/features/funnel/funnel-preview";


export default function Home() {

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
                </div>

                <FunnelPreview/>
            </main>
        </div>
    );
}

