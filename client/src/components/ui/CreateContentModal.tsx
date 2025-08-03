import { useState, useRef, useEffect } from "react";
import { CrossIcon } from "../../icons/crossIcon";
import { BulbIcon } from "../../icons/bulbIcon";
import { Button } from "./Button";
import axios from "axios";
import { useContent } from "../../hooks/useContent";
interface CreateContentModalProps {
  open: boolean;
  onClose: ()=>void;
}

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function CreateContentModal(props:CreateContentModalProps){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [displayMessage, setDisplayMessage] = useState<string|null>(null);
    const [show, setShow] = useState(true);
    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const {refresh} = useContent();
    const tagsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (props.open) {
        setError(null);
        setDisplayMessage(null);
      }
    }, [props.open]);

    async function addContent(){
        try{
            let title = titleRef.current?.value;
            let type = typeRef.current?.value;
            let link = linkRef.current?.value;
            let tags = tagsRef.current?.value?tagsRef.current.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ""): [];
            if(title&&type&&link){
                setIsLoading(true);
                const response = await axios.post(`${url}/api/v1/content`, {
                    link, 
                    type,
                    title,
                    tags
                }, {
                    headers:{
                        "Authorization": localStorage.getItem("token"),
                    }
                })
                console.log(response.data);
                setDisplayMessage(response.data.message)
                setTimeout(()=>{
                    refresh();
                    props.onClose();
                    setDisplayMessage("");
                }, 1000);
            }
            else{
                setError("Please Enter all the details")
            }
        }
        catch(err:any){
           console.error("Full error object:", err)
      console.error("Error response:", err.response)

      if (err.response?.status === 400) {
        const data = err.response.data
        console.log("Error data:", data)

        if (typeof data.message === "string") {
          setError(data.message)
        } else if (typeof data.message === "object" && data.message !== null) {
          // Handle different error response formats
          const errorMessages: string[] = []

          // Check if it's a validation error object
          Object.keys(data.message).forEach((key) => {
            const fieldErrors = data.message[key]
            if (Array.isArray(fieldErrors)) {
              errorMessages.push(...fieldErrors)
            } else if (fieldErrors?._errors && Array.isArray(fieldErrors._errors)) {
              errorMessages.push(...fieldErrors._errors)
            } else if (typeof fieldErrors === "string") {
              errorMessages.push(fieldErrors)
            }
          })

          if (errorMessages.length > 0) {
            setError(errorMessages[0])
          } else {
            setError(`Validation error: ${JSON.stringify(data.message)}`)
          }
        } else if (data.error) {
          setError(data.error)
        } else {
          setError("Invalid input - please check your data")
        }
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (err.response?.status === 403) {
        setError("You don't have permission to perform this action.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message) {
        setError(`Network error: ${err.message}`)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
        }
        finally{
            setIsLoading(false);
        }
    }

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
                            <Input required={true} placeholder="Enter the Title" ref={titleRef} onChange={()=>{}}/>
                            <div className="flex justify-between">
                                <div className="flex-1">
                                    <Input required={true} ref={typeRef} placeholder="Enter the Content Type" onChange={()=>{}}/>
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
                              {/* <li>audio</li> */}
                              <li>document</li>
                              <li>tweet</li>
                              <li>youtube</li>
                              <li>link</li>
                            </ul>
                            </div>}
                            <Input ref={linkRef} required={true} placeholder="Enter the Link to save/Contents of body" onChange={()=>{}}/>
                            <Input ref={tagsRef} required={false} placeholder="Enter tags (comma separated)(optional)" onChange={()=>{}}/>
                            <div  className={`flex justify-center mt-2 ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}>
                                <Button loading={isLoading} variant="primary" text={isLoading ? "Adding..." : "Submit"} size="xl" onClick={addContent}/>
                            </div>
                       </div>
                       {error && (
                        <div className="bg-red-600 border m-2 border-red-500 rounded-lg p-4 text-red-100 font-semibold backdrop-blur-sm">
                          <div className="flex items-center space-x-2 gap-1 justify-center">
                            <span className="text-red-300">⚠</span>
                            <span>{error}</span>
                          </div>
                        </div>
                        )}
                        {displayMessage && (
                            <div className="bg-green-500 border m-2 border-green-600 rounded-lg p-4 text-green-100 font-semibold backdrop-blur-sm">
                              <div className="flex items-center space-x-2 gap-1 justify-center">
                                <span className="text-green-300">✓</span>
                                <span>{displayMessage}</span>
                              </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            )}
        </div>
    )
}

function Input({onChange, placeholder, required, ref}: {onChange: ()=>void, placeholder: string, required?:boolean, ref?:React.Ref<HTMLInputElement>}){
    return(
        <div>
            <input type={"text"} placeholder={placeholder} className="w-[100%] mb-2 break-words px-4 py-2 bg-bgGray-200 rounded-2xl border text-black" required={required} onChange={onChange} ref={ref}></input>
        </div>
    )
}