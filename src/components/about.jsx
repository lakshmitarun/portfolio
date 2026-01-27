import { motion } from "framer-motion"
import profile from "../assets/profile.jpg"

const About = ({ dark }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.section
      id="about"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* LEFT: Profile Image */}
        <motion.div
          className="md:col-span-1 flex justify-center md:justify-start"
          variants={itemVariants}
        >
          <motion.img
            src={profile}
            alt="Profile"
            className="w-72 h-72 rounded-2xl object-cover border border-black/20 dark:border-white/20 shadow-lg"
            whileHover={{ scale: 1.08, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* RIGHT: About + Education */}
        <motion.div className="md:col-span-2" variants={itemVariants}>

          {/* Heading */}
          <motion.h2 
            className="text-3xl font-bold mb-6"
            style={{ color: dark ? "white" : "black" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          {/* Summary */}
          <motion.p 
            className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-10"
            style={{ color: dark ? "#d1d5db" : "#4b5563" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            I am a motivated B.Tech student specializing in Artificial Intelligence
            and Data Science with hands-on experience in Machine Learning and
            Full Stack development. I enjoy building real-world projects and
            continuously improving my technical and problem-solving skills.
          </motion.p>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-4"
              style={{ color: dark ? "white" : "black" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h3>

            <motion.div
              className="space-y-6 text-gray-700 dark:text-gray-300"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  degree: "B.Tech – CSE (AI & Data Science)",
                  school: "Kakinada Institute of Engineering and Technology, Kakinada",
                  details: "CGPA: 7.13 | 2023 – 2027 (Currently 3rd Year)"
                },
                {
                  degree: "Intermediate (MPC)",
                  school: "Sri Chaitanya Junior College, Kakinada",
                  details: "Score: 772"
                },
                {
                  degree: "10th Class",
                  school: "St. Ann Gloria English Medium High School, Ramachandrapuram",
                  details: "Score: 598"
                }
              ].map((edu, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <p
                    className="font-semibold"
                    style={{ color: dark ? "white" : "black" }}
                  >
                    {edu.degree}
                  </p>
                  <p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    {edu.school}
                  </p>
                  <p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    {edu.details}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default About
