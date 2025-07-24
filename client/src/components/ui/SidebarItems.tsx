import type { ReactElement } from "react";

interface ItemsProps {
    "icon": ReactElement,
    "type": string
}

export const Item = (props:ItemsProps)=>{
    return(
        <div className="flex justify-start gap-5 p-5">
            <div className="flex justify-center items-center cursor:pointer">{props.icon}</div>
            <div className="text-xl font-semibold">{props.type}</div>
        </div>
    )
}