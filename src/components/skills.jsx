import { motion } from "framer-motion"

const skills = {
  "Programming Languages": ["Python"],
  "Web Development": ["HTML", "CSS", "JavaScript", "React"],
  "Backend & Databases": ["Node.js", "MongoDB"],
  "Machine Learning": ["NumPy", "Pandas", "Scikit-learn"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code"]
}

const Skills = ({ dark }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.section
      id="skills"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Heading */}
      <motion.h2 
        className="text-3xl font-bold mb-12 text-center"
        style={{ color: dark ? "white" : "black" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              translateY: -5,
              boxShadow: dark
                ? "0 20px 40px rgba(0,0,0,0.3)"
                : "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all"
            style={{
              backgroundColor: dark ? "#111827" : "#f3f4f6",
              borderColor: dark ? "#1f2937" : "#e5e7eb"
            }}
          >
            <motion.h3 
              className="text-xl font-semibold mb-4"
              style={{ color: dark ? "white" : "black" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              {category}
            </motion.h3>

            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {items.map((skill) => (
                <motion.span
                  key={skill}
                  variants={skillVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 transition-all"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "white",
                    color: dark ? "#d1d5db" : "#374151",
                    borderColor: dark ? "#374151" : "#d1d5db"
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Skills
