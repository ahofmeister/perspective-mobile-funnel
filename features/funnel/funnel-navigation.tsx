"use client"
import {ChevronLeft, ChevronRight} from "lucide-react";
import React from "react";
import PaginationButton from "@/features/funnel/pagination-button";

const FunnelNavigation = (props: {
    currentPageIndex: number,
    setCurrentPageIndex: (index: number) => void,
    totalPages: number
}) => {
    const {currentPageIndex, totalPages, setCurrentPageIndex} = props;

    const middleIndex = currentPageIndex === 0
        ? 1
        : (currentPageIndex === totalPages - 1 ? totalPages - 2 : currentPageIndex);

    return (
        <div className="flex justify-center m-4">
            <button className={"cursor-pointer"}
                onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                disabled={currentPageIndex === 0}
            >
                <ChevronLeft/>
            </button>

            <div className="flex items-center">
                <PaginationButton
                    index={0}
                    onClick={() => setCurrentPageIndex(0)}
                    currentPageIndex={currentPageIndex}
                />

                {totalPages > 2 &&
                <PaginationButton
                    index={middleIndex}
                    onClick={() => setCurrentPageIndex(middleIndex)}
                    currentPageIndex={currentPageIndex}
                />
                }

                {totalPages > 1 && (
                    <PaginationButton
                        index={totalPages - 1}
                        onClick={() => setCurrentPageIndex(totalPages - 1)}
                        currentPageIndex={currentPageIndex}
                    />
                )}
            </div>

            <button
                onClick={() => setCurrentPageIndex(Math.min(totalPages - 1, currentPageIndex + 1))}
                disabled={currentPageIndex === totalPages - 1}
            >
                <ChevronRight/>
            </button>
        </div>
    );
};

export default FunnelNavigation;
