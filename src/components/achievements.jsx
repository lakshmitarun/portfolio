import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { convertImageToPDF } from "../utils/convertImageToPDF"
import {
  containerVariants,
  fadeInUpVariants,
  fadeInUpSmallVariants,
  headingVariants,
  cardHoverVariants,
  buttonHoverVariants,
  scrollTriggerConfig,
  tagVariants,
} from "../utils/animationVariants"

const achievements = [
  {
    title: "Kabaddi Medal",
    description: "Won Kabaddi medal in 9th class at school level.",
    year: "School Level",
    downloadFile: "/certificates/kabaddi-medal.jpeg"
  },
  {
    title: "AI for Students: Build Your Own Generative AI Model",
    description:
      "Participated in the workshop 'AI for Students: Build Your Own Generative AI Model' conducted by AI expert and IIT Delhi alumnus, Mr. Trivikrama. Designed to equip students with skills essential in the AI era. Certificate issued by NxtWave.",
    year: "2024",
    downloadFile: "/certificates/nxtwave-ai-workshop.jpeg"
  },
  {
    title: "Modern Machine Learning Certificate",
    description:
      "Completed Foundations of Modern Machine Learning (FMML) one-year online course from iHub-Data, IIIT Hyderabad (27 July 2024 - 18 April 2025) with Grade A.",
    year: "2024-2025",
    downloadFile: "/certificates/fmml-iiit.jpeg"
  },
  {
    title: "Python Full Stack Developer Virtual Internship",
    description:
      "Successfully completed 10 weeks Python Full Stack Developer Virtual Internship (October - December 2024) from EduSkills Academy. Grade: A (Outstanding).",
    year: "2024",
    downloadFile: "/certificates/python-fullstack-eduskills.jpeg"
  },
  {
    title: "AI-ML Virtual Internship",
    description:
      "Successfully completed 10 weeks AI-ML Virtual Internship (January - March 2025) from EduSkills supported by India Edu Program and Google for Developers. Grade: 0 (Outstanding).",
    year: "2025",
    downloadFile: "/certificates/aiml-eduskills.jpeg"
  },
  {
    title: "Android Developer Virtual Internship",
    description:
      "Successfully completed 10 weeks Android Developer Virtual Internship (April - June 2025) from EduSkills supported by India Edu Program and Google for Developers. Grade: E (Excellent).",
    year: "2025",
    downloadFile: "/certificates/android-eduskills.jpeg"
  },
  {
    title: "Java Full Stack Developer Virtual Internship",
    description:
      "Successfully completed 10 weeks Java Full Stack Developer Virtual Internship (October - December 2025) from EduSkills Academy. Grade: O (Outstanding).",
    year: "2025",
    downloadFile: "/certificates/java-fullstack-eduskills.jpeg"
  },
  {
    title: "NVIDIA Certificate",
    description:
      "Completed NVIDIA certification program demonstrating expertise and proficiency in NVIDIA technologies and best practices.",
    year: "2025",
    downloadFile: "/certificates/NVIDA_TARUN_CERTIFICATE.pdf"
  },
]

const Achievements = ({ dark }) => {
  const downloadAll = () => {
    achievements.forEach((item) => {
      const fileName = item.downloadFile.split("/").pop()
      const fileExtension = fileName.split(".").pop().toLowerCase()
      
      if (fileExtension === "pdf") {
        // Direct download for PDF files
        const link = document.createElement("a")
        link.href = item.downloadFile
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Convert image to PDF
        const pdfFileName = fileName.replace(/\.[^/.]+$/, ".pdf")
        convertImageToPDF(item.downloadFile, pdfFileName)
      }
    })
  }

  const handleSingleDownload = (item) => {
    const fileName = item.downloadFile.split("/").pop()
    const fileExtension = fileName.split(".").pop().toLowerCase()
    
    if (fileExtension === "pdf") {
      // Direct download for PDF files
      const link = document.createElement("a")
      link.href = item.downloadFile
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Convert image to PDF
      const pdfFileName = fileName.replace(/\.[^/.]+$/, ".pdf")
      convertImageToPDF(item.downloadFile, pdfFileName)
    }
  }

  return (
    <motion.section
      id="achievements"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={scrollTriggerConfig}
    >
      {/* Heading */}
      <motion.h2 
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: dark ? "white" : "black" }}
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={scrollTriggerConfig}
      >
        Achievements & Certifications
      </motion.h2>

      {/* Download All Button */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={scrollTriggerConfig}
      >
        <motion.button
          onClick={downloadAll}
          className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition flex items-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Download size={20} />
          </motion.div>
          Download All Certificates
        </motion.button>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={scrollTriggerConfig}
      >
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUpVariants}
            whileHover={{
              scale: 1.04,
              translateY: -6,
              boxShadow: dark
                ? "0 20px 40px rgba(0,0,0,0.3)"
                : "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition flex flex-col"
            style={{
              backgroundColor: dark ? "#111827" : "#f3f4f6",
              borderColor: dark ? "#1f2937" : "#e5e7eb"
            }}
          >
            <motion.div
              className="flex justify-between items-start mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={scrollTriggerConfig}
            >
              <motion.h3 
                className="text-xl font-semibold flex-1"
                style={{ color: dark ? "white" : "black" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={scrollTriggerConfig}
              >
                {item.title}
              </motion.h3>
              <motion.span 
                className="text-sm font-medium px-3 py-1 rounded-full ml-2 shrink-0"
                style={{
                  backgroundColor: dark ? "#1f2937" : "#e5e7eb",
                  color: dark ? "#60a5fa" : "#3b82f6"
                }}
                variants={tagVariants}
                initial="hidden"
                whileInView="visible"
                viewport={scrollTriggerConfig}
              >
                {item.year}
              </motion.span>
            </motion.div>

            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-4 flex-1"
              style={{ color: dark ? "#d1d5db" : "#4b5563" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              viewport={scrollTriggerConfig}
            >
              {item.description}
            </motion.p>

            <motion.button
              onClick={() => handleSingleDownload(item)}
              className="w-full px-4 py-2 rounded-lg text-center bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Download size={16} />
              </motion.div>
              Download Certificate
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Achievements