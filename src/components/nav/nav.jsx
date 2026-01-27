import { motion } from "framer-motion"
import { Moon, Sun, Download } from "lucide-react"
import { useState, useEffect } from "react"
import profile from "../../assets/profile.jpg"

const Nav = ({ dark, setDark, onDownloadResume }) => {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "LeetCode", id: "leetcode" },
    { label: "Projects", id: "projects" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="w-full px-6 py-3 flex items-center justify-between">

        {/* LEFT: Profile Image & Name */}
        <motion.div
          className="flex items-center shrink-0 gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: isScrolling ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden sm:inline"
            style={{ pointerEvents: "none" }}
          >
            P. Lakshmi Tarun
          </motion.span>
        </motion.div>

        {/* RIGHT: Links + Icons */}
        <div className="flex items-center gap-6 shrink-0">

          {/* Links */}
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            {navItems.map(({ label, id }, index) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
              >
                <motion.a
                  href={`#${id}`}
                  whileHover={{ color: dark ? "#ffffff" : "#000000", scale: 1.05 }}
                  className="transition-colors"
                >
                  {label}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Resume Download Button */}
          <motion.button
            onClick={onDownloadResume}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition flex items-center gap-2"
          >
            <Download size={16} />
            Resume
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDark((prev) => !prev)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 flex items-center justify-center hover:scale-105 transition cursor-pointer"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: dark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.button>

        </div>
      </div>
    </motion.nav>
  )
}

export default Nav
