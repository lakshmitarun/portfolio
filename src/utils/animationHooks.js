/**
 * Custom hook for scroll-triggered animations
 * Provides easy integration with Framer Motion for viewport-triggered animations
 */

import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

/**
 * Hook for detecting when element enters viewport
 * @param {object} options - Configuration options
 * @returns {object} { ref, isInView }
 */
export const useScrollTrigger = (
  options = {
    once: true,
    margin: "-80px",
    amount: "some",
  }
) => {
  const ref = useRef(null)
  const isInView = useInView(ref, options)

  return { ref, isInView }
}

/**
 * Hook for detecting when element is visible (for conditional rendering)
 * @param {number} delay - Delay before triggering (ms)
 * @returns {object} { ref, isVisible }
 */
export const useVisibilityTrigger = (delay = 0) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50%" })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return { ref, isVisible }
}

/**
 * Hook for staggered animation delays
 * @param {number} itemCount - Number of items to stagger
 * @param {number} baseDelay - Base delay in ms
 * @param {number} staggerAmount - Delay between items in ms
 * @returns {array} Array of delays
 */
export const useStaggeredDelays = (itemCount, baseDelay = 100, staggerAmount = 80) => {
  return Array.from({ length: itemCount }, (_, i) => baseDelay + i * staggerAmount)
}

/**
 * Hook for managing animation state
 * @returns {object} Animation state and controls
 */
export const useAnimationState = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => setIsAnimating(true)
  const stopAnimation = () => setIsAnimating(false)

  return {
    isAnimating,
    startAnimation,
    stopAnimation,
  }
}

/**
 * Hook for coordinating multiple animations
 * @param {array} animationKeys - Keys to track
 * @returns {object} Animation tracker
 */
export const useAnimationTracker = (animationKeys = []) => {
  const [completed, setCompleted] = useState(
    animationKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  )

  const markComplete = (key) => {
    setCompleted((prev) => ({ ...prev, [key]: true }))
  }

  const allComplete = Object.values(completed).every(Boolean)

  return { completed, markComplete, allComplete }
}
