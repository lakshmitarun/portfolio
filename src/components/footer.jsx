import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"

const Footer = ({ dark }) => {
  const currentYear = new Date().getFullYear()

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/lakshmitarun",
      label: "GitHub",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/lakshmi-tarun-palivela-010582292/",
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
  ]

  return (
    <motion.footer
      className="border-t transition-colors duration-300"
      style={{
        borderColor: dark ? "#1f2937" : "#d1d5db",
        backgroundColor: dark ? "#030716" : "#f9fafb",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Name & Role */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-lg font-semibold"
              style={{ color: dark ? "#ffffff" : "#1f2937" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              P. Lakshmi Tarun
            </motion.h3>
            <motion.p
              className="text-sm"
              style={{ color: dark ? "#d1d5db" : "#4b5563" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Full Stack Developer | AI & Data Science
            </motion.p>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-semibold"
              style={{ color: dark ? "#ffffff" : "#1f2937" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.p>
            <motion.nav
              className="flex flex-col gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm transition-colors duration-200"
                  style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                  whileHover={{
                    color: dark ? "#ffffff" : "#000000",
                    x: 4,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>

          {/* Right: Social Links */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-semibold"
              style={{ color: dark ? "#ffffff" : "#1f2937" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Connect
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`transition-colors duration-200 ${social.color}`}
                    style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px"
          style={{ backgroundColor: dark ? "#1f2937" : "#e5e7eb" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        />

        {/* Copyright Section */}
        <motion.div
          className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm"
            style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            © {currentYear} P. Lakshmi Tarun. All rights reserved.
          </motion.p>

          <motion.p
            className="text-sm"
            style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Built with <span className="text-red-500">❤</span> using React & Tailwind CSS
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
