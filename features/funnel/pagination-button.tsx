import React from "react";

const PaginationButton = (props: { index: number, onClick: () => void, currentPageIndex: number }) =>
    <button
        onClick={props.onClick}
        className={`mx-1 rounded w-8 ${props.index === props.currentPageIndex ? 'border border-orange-500' : 'border border-gray-300'}`}
    >
        {props.index + 1}
    </button>;


export default PaginationButton