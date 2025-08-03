import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from '../icons/brain.svg'
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-purpleBlue-300 text-purpleBlue-600">
      
      {/* Navbar */}
      <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute top-6 left-1/2  transform -translate-x-1/2 z-20 px-3 py-3  rounded-full shadow-md flex gap-2 justify-center items-center text-sm font-medium text-white bg-purpleBlue-600 w-fit space-x-6"
    >
      <button onClick={() => navigate("/")} className="hover:bg-purpleBlue-500/90 sm:px-4 sm:py-1.5 p-2 rounded-xl transition">Home</button>
      <a
        href="https://github.com/Bhumesh01/SecondBrain"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:hover:bg-purpleBlue-500/90 p-2 sm:px-4 sm:py-1.5 rounded-full transition"
      >
        GitHub
      </a>
      <a
        href="mailto:your-bhumeshmahajan01@gmail.com"
        className="hover:hover:bg-purpleBlue-500/90 p-2 sm:px-4 sm:py-1.5 rounded-full transition"
      >
        Contact
      </a>
      <button
        onClick={() => navigate("/signin")}
        className="whitespace-nowrap text-white sm:px-4 sm:py-1.5 rounded-full hover:hover:bg-purpleBlue-500/90 p-2 transition"
      >
        Log In
      </button>
    </motion.nav>


      {/* Aurora Animated Background */}
      <AuroraBlob
        className="top-[-30%] left-[-20%] bg-purpleBlue-500"
        duration={12}
        size={500}
      />
      <AuroraBlob
        className="bottom-[-20%] right-[-10%] bg-purpleBlue-600"
        duration={15}
        size={400}
      />
      <AuroraBlob
        className="top-[30%] right-[30%] bg-purpleBlue-100"
        duration={18}
        size={350}
      />

      {/* Main Content */}
      <LogoCenter />
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto h-full flex flex-col justify-center items-center">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-black mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Never Lose an Idea Again
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-black mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <strong>Second Brain</strong> helps you capture, organize, and retrieve your ideas, links, and documents—all in one simple, powerful space.
        </motion.p>
        <motion.button
          onClick={() => navigate('/signup')}
          className="bg-purpleBlue-600 hover:bg-purpleBlue-500/90 text-white font-medium py-3 px-6 rounded-full transition break-words"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Activate Your Brain Now
        </motion.button>
      </div>
    </div>
  );
}

// Aurora Blob Animation
interface AuroraBlobProps {
  className: string
  duration: number
  size: number
}

function AuroraBlob({ className, duration, size }: AuroraBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-25 ${className}`}
      style={{ width: size, height: size }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -50, 30, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}
function LogoCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
    >
      <img
        src={Logo}
        alt="Second Brain Logo"
        className="w-80 h-80 mb-4 drop-shadow-lg opacity-50"
      />
    </motion.div>
  );
}