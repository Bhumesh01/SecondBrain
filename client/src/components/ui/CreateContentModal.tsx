import type { ReactElement } from "react";
import { CrossIcon } from "../../icons/crossIcon";
interface CreateContentModalProps {
  open: boolean;
  onClose: ReactElement;
}
export function CreateContentModal(props:CreateContentModalProps){
    return(
        <div>
            {props.open && (
            <div className="fixed inset-0 z-[9999] flex justify-center items-center">
                <div className="absolute inset-0 bg-slate-500 opacity-60"></div>
                <div className="relative z-10 flex flex-col justify-center">
                    <div className="bg-white flex flex-col gap-2 rounded-2xl justify-center items-center m-2">
                        <div className="text-2xl font-bold rounded-2xl p-5 flex justify-between gap-15">
                            <div>Please Add The Contents</div>
                            <button className="bg-red-600 hover:bg-red-500 w-fit p-2 flex rounded-xl font-bold items-center relative -top-3">
                                <CrossIcon />
                            </button>
                        </div>
                        <Input placeholder={"Enter the text"} onChange={()=>{}}/>
                    </div>
                    <span>{props.onClose}</span>
                </div>
            </div>
            )}
        </div>
    )
}

function Input({onChange, placeholder}: {onChange: ()=>void, placeholder: string}){
    return(
        <div>
            <input type={"text"} placeholder={placeholder} className="px-4 py-2" onChange={onChange}></input>
        </div>
    )
}