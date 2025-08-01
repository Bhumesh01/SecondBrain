import type { ReactElement } from "react"

// Here i have to define the type of the button ie what's the button is expecting(what kind of props)
type Variants = "primary"|"secondary"|"default";
interface ButtonProps{
    variant: "primary"|"secondary",
    size: "lg"|"xl"|"2xl",
    text: string|boolean,
    startIcon?: ReactElement;
    endIcon ?: ReactElement;
    onClick: ()=> void;
    loading ?: boolean;
}
const sizeClasses = {
    lg: "py-2 px-3",
    xl: "py-2 px-5",
    "2xl": "py-3 px-8",
}
type VariantStyles = Record<Variants, string>;
const variantStyles: VariantStyles= {
    "default": "font-medium rounded-md p-2 flex justify-around gap-2 items-center",
    "primary": "bg-purpleBlue-600 transition duration-200 text-white hover:bg-purpleBlue-500 active:scale-75 active:bg-purpleBlue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    "secondary": "bg-purpleBlue-300 transition duration-200 text-purpleBlue-600 hover:bg-purpleBlue-100 active:scale-75 active:bg-purpleBlue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
}

export const Button = (props:ButtonProps)=>{
    const sizeStyle = sizeClasses[props.size];
    return (
        <button
            disabled={props.loading}
            onClick={props.onClick}
            className={`${sizeStyle} ${variantStyles["default"]} ${props.variant === "primary" ? variantStyles["primary"] : variantStyles["secondary"]}`}
        >
            {props.startIcon}
            {props.text}
            {props.endIcon}
            {props.loading&&<svg className="ml-3 w-5 h-5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeOpacity="0.75"/>
            </svg>}
        </button>
    );
}
