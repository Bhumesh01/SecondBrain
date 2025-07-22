import type { ReactElement } from "react"

// Here i have to define the type of the button ie what's the button is expecting(what kind of props)
type Variants = "primary"|"secondary"|"default";
interface ButtonProps{
    variant: "primary"|"secondary",
    size: "lg"|"xl"|"2xl",
    text: string,
    startIcon?: ReactElement;
    endIcon ?: ReactElement;
    onClick: ()=> void;
}
const sizeClasses = {
    lg: "py-2 px-3",
    xl: "py-2 px-5",
    "2xl": "py-3 px-8",
}
type VariantStyles = Record<Variants, string>;
const variantStyles: VariantStyles= {
    "default": "font-medium rounded-md p-2 flex justify-between gap-2",
    "primary": "bg-purpleBlue-600 text-white hover:bg-purpleBlue-500",
    "secondary": "bg-purpleBlue-300 text-purpleBlue-600 hover:bg-purpleBlue-100"
}

export const Button = (props:ButtonProps)=>{
    const sizeStyle = sizeClasses[props.size];
    return (
        <button
            onClick={props.onClick}
            className={`${sizeStyle} ${variantStyles["default"]} ${props.variant === "primary" ? variantStyles["primary"] : variantStyles["secondary"]}`}
        >
            {props.startIcon}
            {props.text}
            {props.endIcon}
        </button>
    );
}
