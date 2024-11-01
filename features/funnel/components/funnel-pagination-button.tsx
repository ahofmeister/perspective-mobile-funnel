import React from "react";

const FunnelPaginationButton = (props: { index: number, onClick: () => void, currentPageIndex: number }) =>
    <button
        onClick={props.onClick}
        className={`mx-1 rounded w-8 border-2 ${props.index === props.currentPageIndex ? 'border-blue-500' : 'border-gray-300'}`}
    >
        {props.index + 1}
    </button>;


export default FunnelPaginationButton