/**
 * Professional Animation Variants
 * Designed for smooth, recruiter-friendly animations
 * Compatible with Framer Motion and Tailwind CSS
 */

// ========== CONTAINER ANIMATIONS ==========

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren",
    },
  },
}

export const containerFastVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: "beforeChildren",
    },
  },
}

// ========== FADE & SLIDE-UP ANIMATIONS ==========

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const fadeInUpSmallVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// ========== SCALE & ROTATE ANIMATIONS ==========

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const scaleInSmallVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// ========== SLIDE ANIMATIONS ==========

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// ========== CARD HOVER ANIMATIONS ==========

export const cardHoverVariants = {
  hover: {
    scale: 1.04,
    translateY: -6,
    transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.3 },
  },
  tap: { scale: 0.98 },
}

export const cardLightHoverVariants = {
  hover: {
    scale: 1.02,
    translateY: -4,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
}

// ========== BUTTON ANIMATIONS ==========

export const buttonHoverVariants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
  tap: { scale: 0.95 },
}

export const buttonLightHoverVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
}

// ========== SKILL & TECH TAG ANIMATIONS ==========

export const tagVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { scale: 1.08, y: -3, transition: { duration: 0.2 } },
}

// ========== ICON ANIMATIONS ==========

export const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: { scale: 1.15, rotate: 5, transition: { duration: 0.3 } },
}

// ========== NAVBAR ANIMATIONS ==========

export const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

// ========== IMAGE ANIMATIONS ==========

export const imageHoverVariants = {
  hover: {
    scale: 1.08,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
}

export const profileImageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    transition: { type: "spring", stiffness: 300 },
  },
}

// ========== HEADING ANIMATIONS ==========

export const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// ========== STAGGERED LIST ANIMATIONS ==========

export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// ========== LOADING & SKELETON ANIMATIONS ==========

export const skeletonVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 2, repeat: Infinity },
  },
}

export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, easing: "linear" },
  },
}

// ========== COMBINED ANIMATIONS ==========

export const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// ========== SCROLL TRIGGER ANIMATION CONFIG ==========

export const scrollTriggerConfig = {
  once: true,
  margin: "-80px",
  amount: "some",
}

// ========== ANIMATION HELPERS ==========

/**
 * Generate staggered delays for array items
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in seconds
 * @param {number} staggerDelay - Delay between items in seconds
 * @returns {number} Calculated delay
 */
export const getStaggerDelay = (index, baseDelay = 0.1, staggerDelay = 0.08) => {
  return baseDelay + index * staggerDelay
}

/**
 * Get responsive animation config based on breakpoint
 * @param {boolean} isMobile - Is mobile device
 * @returns {object} Animation config
 */
export const getResponsiveAnimationConfig = (isMobile) => {
  return {
    staggerChildren: isMobile ? 0.08 : 0.1,
    delayChildren: isMobile ? 0.1 : 0.2,
  }
}

/**
 * Exit animation config (reverse of entrance)
 */
export const exitVariants = {
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}
