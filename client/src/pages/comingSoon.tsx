import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export function ComingSoon() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bgGray-100 to-bgGray-600 text-purpleBlue-600 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purpleBlue-600 drop-shadow-md">
          🚧 Coming Soon
        </h1>
        <p className="text-purpleBlue-500 text-lg md:text-xl mb-8">
          We're working hard to bring something awesome for you!
        </p>
        <div className="bg-purpleBlue-100 border-white backdrop-blur-lg px-6 py-4 rounded-xl shadow-lg">
          <span className="text-sm text-purpleBlue-600">
            Stay tuned for updates...
          </span>
        </div>
        <div onClick={()=>{navigate('/dashboard')}} className="mt-5 bg-purpleBlue-500 border-white backdrop-blur-lg px-6 py-4 rounded-xl shadow-lg hover:bg-purpleBlue-500/70 active:bg-purpleBlue-500/70">
          <span className="text-sm text-white">
            Go Back To DashBoard
          </span>
        </div>
      </motion.div>
    </div>
  );
}