import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, Instagram, Github } from "lucide-react"

const Contact = ({ dark }) => {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "lakshmitaruntarungmail.com",
      href: "mailto:lakshmitaruntarungmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "6303474889",
      href: "tel:6303474889"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "lakshmitarun",
      href: "https://github.com/lakshmitarun"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Lakshmi Tarun Palivela",
      href: "https://www.linkedin.com/in/lakshmi-tarun-palivela-010582292/"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@single__boy__tarun__",
      href: "https://www.instagram.com/single__boy__tarun__/"
    }
  ]

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.section
      id="contact"
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
        Contact Me
      </motion.h2>

      {/* Contact Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {contacts.map((contact, index) => {
          const IconComponent = contact.icon
          return (
            <motion.a
              key={index}
              href={contact.href}
              target={contact.label !== "Email" && contact.label !== "Phone" ? "_blank" : "_self"}
              rel={contact.label !== "Email" && contact.label !== "Phone" ? "noopener noreferrer" : ""}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                translateY: -5,
                boxShadow: dark
                  ? "0 20px 40px rgba(0,0,0,0.3)"
                  : "0 20px 40px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition flex items-center gap-4"
              style={{
                backgroundColor: dark ? "#111827" : "#f3f4f6",
                borderColor: dark ? "#1f2937" : "#e5e7eb"
              }}
            >
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                style={{
                  backgroundColor: dark ? "#1f2937" : "#e5e7eb"
                }}
              >
                <IconComponent 
                  size={24} 
                  style={{ color: dark ? "#60a5fa" : "#3b82f6" }}
                />
              </motion.div>

              <div className="min-w-0 flex-1">
                <p 
                  className="text-sm font-medium"
                  style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                >
                  {contact.label}
                </p>
                <p 
                  className="text-lg font-semibold truncate"
                  style={{ color: dark ? "white" : "black" }}
                  title={contact.value}
                >
                  {contact.value}
                </p>
              </div>
            </motion.a>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

export default Contact
