import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const Introduction = ({ dark }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 min-h-screen flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: dark ? "white" : "black" }}
          variants={itemVariants}
        >
          Palivela Lakshmi Tarun
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-xl md:text-2xl font-semibold mb-6"
          style={{ color: dark ? "#60a5fa" : "#3b82f6" }}
          variants={itemVariants}
        >
          AI & Data Science Enthusiast | Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          style={{ color: dark ? "#d1d5db" : "#4b5563" }}
          variants={itemVariants}
        >
          I'm a B.Tech student specializing in Artificial Intelligence and Data Science, passionate about building real-world projects and solving complex problems through innovative technology solutions.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#about"
          className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition mb-12"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.a>

        {/* Scroll Down Indicator */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          variants={itemVariants}
        >
          <ArrowDown
            size={32}
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Introduction
