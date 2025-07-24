import { useState } from "react";
import { CrossIcon } from "../../icons/crossIcon";
import { BulbIcon } from "../../icons/bulbIcon";
import { Button } from "./Button";
interface CreateContentModalProps {
  open: boolean;
  onClose: ()=>void;
}
export function CreateContentModal(props:CreateContentModalProps){
    const [show, setShow] = useState(false);
    return(
        <div>
            {props.open && (
            <div className="fixed inset-0 z-[9999] flex justify-center items-center m-2">
                <div className="absolute inset-0 bg-slate-500 opacity-60"></div>
                <div className="relative z-10 flex flex-col ">
                    <div className="bg-white flex flex-col gap-2 rounded-2xl  m-2">
                        <div className="text-2xl font-bold rounded-2xl p-5 flex justify-between gap-15">
                            <div>Please Add The Contents</div>
                            <button className="cursor-pointer active:scale-75 active:bg-red-600 hover:bg-red-600 w-fit p-2 flex rounded-xl font-bold items-center relative -top-3 transition  ease-in-out duration-500" onClick={props.onClose}>
                                <CrossIcon />
                            </button>
                        </div>
                       <div className="ml-3 mr-3 mb-3">
                            <Input required={true} placeholder="Enter the Title" onChange={()=>{}}/>
                            <div className="flex justify-between">
                                <div className="flex-1">
                                    <Input required={true} placeholder="Enter the Content Type" onChange={()=>{}}/>
                                </div>
                                <div onClick={()=>setShow(curr=>!curr)} className="flex cursor-pointer items-center transition  ease-in-out duration-500 active:scale-75 active:bg-yellow-300 hover:bg-yellow-300 p-2 ml-2 mb-2 rounded-2xl">
                                    <BulbIcon />
                                </div>
                            </div>
                            {show&&<div className="absolute top-0 left-0 m-4 bg-purpleBlue-300 outline outline-purpleBlue-500 border-l-4 border-purpleBlue-500 text-blue-950 p-4 rounded-xl shadow-lg">
                            <div className="font-semibold text-xl mb-2 flex justify-between items-center">
                                <div>Allowed Types:</div>
                                <div className="ml-5 cursor-pointer relative -top-2 transition  ease-in-out duration-500 bg-red-600 rounded-xl p-1 active:scale-75 active:bg-red-400 hover:bg-red-400" onClick={()=>setShow(curr=>!curr)}><CrossIcon /></div>
                            </div>
                            <ul className="list-decimal text-purpl list-inside text-lg font-medium">
                              <li>article</li>
                              <li>image</li>
                              <li>audio</li>
                              <li>document</li>
                              <li>tweet</li>
                              <li>youtube</li>
                              <li>link</li>
                            </ul>
                            </div>}
                            <Input required={true} placeholder="Enter the Link to save/Contents of body" onChange={()=>{}}/>
                            <Input required={false} placeholder="Enter the sub Heading (optional)" onChange={()=>{}}/>
                            <Input required={false} placeholder="Enter tags (comma separated)(optional)" onChange={()=>{}}/>
                            <div className="flex justify-center mt-2">
                                <Button variant="primary" text="Submit" size="xl" onClick={()=>{}}/>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

function Input({onChange, placeholder, required}: {onChange: ()=>void, placeholder: string, required?:boolean}){
    return(
        <div>
            <input type={"text"} placeholder={placeholder} className="w-[100%] mb-2 word break px-4 py-2 bg-bgGray-200 rounded-2xl border text-black" required={required} onChange={onChange}></input>
        </div>
    )
}