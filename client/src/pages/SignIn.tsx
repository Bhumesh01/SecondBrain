import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import Logo from "../icons/brain.svg"
import axios from "axios"

const url = import.meta.env.VITE_BACKEND_URL

export function SignIn() {
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function signin() {
    try {
      setIsLoading(true)
      setUsernameError("");
      setPasswordError("");
      setError("");
      setDisplayMessage("");

      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (username && password) {
        const response = await axios.post(`${url}/api/v1/signin`, {
          username: username,
          password: password,
        })
        console.log(response.data)
        setDisplayMessage(response.data.message)
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        setTimeout(()=>{
            navigate('/dashboard')
        }, 1000)
      }
      else{
        setError("All credentials are required")
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setUsernameError(err.response.data.usernameErrors?.[0] || "")
        setPasswordError(err.response.data.passwordErrors?.[0] || "")
      } else if (err.response?.status === 403) {
        setError(err.response.data.message)
      } else if(err.response?.status === 404){
        setError(err.response.data.message)
        setTimeout(()=>{
            navigate('/signup')
        }, 1000)
      } else {
        setError("Something went wrong")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-radial-[at_50%_75%] from-purpleBlue-500 to-purpleBlue-300 flex justify-center items-center p-4">
      <div className="bg-white/30 backdrop-blur-lg border border-purpleBlue-300/50 shadow-2xl w-full max-w-md rounded-3xl p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border border-purpleBlue-100/30">
            <img width={80} height={80} src={Logo || "/placeholder.svg"} alt="Logo" className="drop-shadow-lg" />
          </div>
          <h1 className="font-bold text-4xl text-slate-900 drop-shadow-lg">Sign In</h1>
          <p className="text-slate-900/90 text-center">Please enter your credentials</p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-slate-900/90 font-medium text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              ref={usernameRef}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/10 border border-purpleBlue-100/40 rounded-xl text-slate-900 placeholder:text-slate-900/60 focus:outline-none focus:ring-2 focus:ring-purpleBlue-100/60 focus:border-purpleBlue-100/60 transition-all duration-200 disabled:opacity-50"
            />
            {usernameError && (
              <div className="bg-red-500 border border-red-600 rounded-lg p-3 text-red-100 text-sm font-medium backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-red-300">⚠</span>
                  <span>{usernameError}</span>
                </div>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-slate-900/90 font-medium text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/10 border border-purpleBlue-100/40 rounded-xl text-slate-900 placeholder:text-slate-900/60 focus:outline-none focus:ring-2 focus:ring-purpleBlue-100 focus:border-purpleBlue-100/60 transition-all duration-200 disabled:opacity-50"
            />
            {passwordError && (
              <div className="bg-red-500 border border-red-600 rounded-lg p-3 text-red-100 text-sm font-medium backdrop-blur-sm">
                <div className="flex items-center space-x-2 gap-1 justify-center">
                  <span className="text-red-300">⚠</span>
                  <span>{passwordError}</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-center">
            <div className={isLoading ? "opacity-75 cursor-not-allowed" : ""} >
              <Button
                text={isLoading ? "Logging In..." : "Sign In"}
                variant="primary"
                size="2xl"
                onClick={signin}
                loading={isLoading}
              />
            </div>
          </div>

          {/* Success Message */}
          {displayMessage && (
            <div className="bg-green-500 border border-green-600 rounded-lg p-4 text-green-100 font-semibold backdrop-blur-sm">
              <div className="flex items-center space-x-2 gap-1 justify-center">
                <span className="text-green-300">✓</span>
                <span>{displayMessage}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-600 border border-red-500 rounded-lg p-4 text-red-100 font-semibold backdrop-blur-sm">
              <div className="flex items-center space-x-2 gap-1 justify-center">
                <span className="text-red-300">⚠</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
