import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  containerVariants,
  containerFastVariants,
  fadeInUpVariants,
  fadeInUpSmallVariants,
  headingVariants,
  cardHoverVariants,
  buttonHoverVariants,
  scrollTriggerConfig,
} from "../utils/animationVariants"

/**
 * LeetCode Component - Auto-Polling with Cache-Busting
 * 
 * Features:
 * ✓ Auto-polls LeetCode API every 10 minutes
 * ✓ Cache-busting with timestamps to defeat CDN caching
 * ✓ localStorage fallback for deployment caching issues
 * ✓ Manual refresh button for immediate updates
 * ✓ Displays last update time
 * ✓ Dark/light theme support
 * ✓ Error handling with graceful degradation
 */
const LeetCode = ({ dark }) => {
  const POLL_INTERVAL = 10 * 60 * 1000 // 10 minutes
  const CACHE_KEY = "leetcode_stats_cache"
  const LAST_UPDATE_KEY = "leetcode_last_update"
  const username = "P_lakshmi_tarun"

  const getInitialStats = () => {
    if (typeof window === "undefined") return getDefaultStats()
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      return cached ? JSON.parse(cached) : getDefaultStats()
    } catch {
      return getDefaultStats()
    }
  }

  const getDefaultStats = () => ({
    totalSolved: 4,
    easySolved: 4,
    mediumSolved: 0,
    hardSolved: 0,
    submissionCalendar: {
      1754352000: 4,
      1769126400: 3,
      1769212800: 1,
    },
    totalSubmissions: 8,
  })

  const [stats, setStats] = useState(getInitialStats())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const pollIntervalRef = useRef(null)
  const isMountedRef = useRef(true)

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Cache-busting: unique timestamp prevents caching
      const timestamp = Date.now()
      const url = `https://alfa-leetcode-api.onrender.com/userProfile/${username}?t=${timestamp}`

      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "If-Modified-Since": new Date(0).toUTCString(),
        },
        credentials: "omit",
      })

      if (response.status === 429) {
        console.warn("⏳ API rate limited (429)")
        setError("API rate limited. Using cached data.")
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      console.log("✓ LeetCode API Data Fetched:", data)

      const newStats = {
        totalSolved: data.totalSolved || 4,
        easySolved: data.easySolved || 4,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        submissionCalendar: data.submissionCalendar || {},
        totalSubmissions: data.totalSubmissions?.[0]?.submissions || 8,
      }

      if (isMountedRef.current) {
        setStats(newStats)
        setError(null)
        
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(newStats))
          const now = new Date().toLocaleString()
          localStorage.setItem(LAST_UPDATE_KEY, now)
          setLastUpdate(now)
          console.log("✓ Stats cached to localStorage")
        } catch (e) {
          console.warn("⚠️ Could not save to localStorage:", e)
        }
      }
    } catch (err) {
      console.error("✗ LeetCode Fetch Error:", err)
      if (isMountedRef.current) {
        setError(`Failed to fetch: ${err.message}`)
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true

    // Fetch immediately on mount
    fetchStats()

    // Setup auto-polling every 10 minutes
    pollIntervalRef.current = setInterval(() => {
      console.log("🔄 Auto-polling LeetCode stats...")
      fetchStats()
    }, POLL_INTERVAL)

    // Restore last update time
    if (typeof window !== "undefined") {
      try {
        const savedTime = localStorage.getItem(LAST_UPDATE_KEY)
        if (savedTime) setLastUpdate(savedTime)
      } catch {
        // Ignore localStorage errors
      }
    }

    return () => {
      isMountedRef.current = false
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [])

  /**
   * Generate calendar grid with proper week organization
   * 
   * FIXES:
   * 1. Normalizes timestamps to UTC midnight (removes time component)
   * 2. Properly accesses submission calendar with Unix timestamps
   * 3. Correctly calculates date from timestamp
   * 4. Handles timezone issues by using UTC dates
   * 5. Starts from a Sunday to ensure proper week alignment
   */
  const generateCalendar = () => {
    const now = new Date()
    
    // Go back 1 year from today (at midnight UTC)
    const oneYearAgo = new Date(Date.UTC(
      now.getUTCFullYear() - 1,
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0
    ))

    // Find the most recent Sunday before (or on) oneYearAgo
    const dayOfWeek = oneYearAgo.getUTCDay()
    const startDate = new Date(oneYearAgo)
    startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek)

    const days = []

    // Generate 371 days (52 weeks + 5 days, starting from Sunday)
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate)
      date.setUTCDate(date.getUTCDate() + i)

      // Normalize to midnight UTC and convert to Unix timestamp
      const timestamp = Math.floor(date.getTime() / 1000)

      // Get submission count for this date
      const submissions = stats.submissionCalendar[timestamp] || 0

      days.push({
        date: date.toISOString().split("T")[0],
        submissions,
        timestamp,
        dayOfWeek: date.getUTCDay(),
      })
    }

    // Organize into weeks (Sun-Sat) - no padding needed since we start on Sunday
    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return {
      weeks,
      monthOrder: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    }
  }

  /**
   * Calculate total days with at least one submission
   */
  const calculateActiveDays = () => {
    return Object.values(stats.submissionCalendar || {}).filter(
      (count) => count > 0
    ).length
  }

  /**
   * Calculate longest consecutive submission streak
   * 
   * Algorithm:
   * - Sort timestamps chronologically
   * - Compare consecutive dates
   * - If difference is 1 day, increment streak
   * - Track maximum streak found
   */
  const calculateMaxStreak = () => {
    const calendar = stats.submissionCalendar || {}
    const timestamps = Object.keys(calendar)
      .map(Number)
      .sort((a, b) => a - b)

    if (timestamps.length === 0) return 0

    let maxStreak = 0
    let currentStreak = 0
    let lastDate = null

    timestamps.forEach((timestamp) => {
      if (calendar[timestamp] > 0) {
        const currentDate = new Date(timestamp * 1000)

        if (lastDate) {
          const dayDiff = Math.floor(
            (currentDate - lastDate) / (1000 * 60 * 60 * 24)
          )
          if (dayDiff === 1) {
            currentStreak++
          } else {
            maxStreak = Math.max(maxStreak, currentStreak)
            currentStreak = 1
          }
        } else {
          currentStreak = 1
        }

        lastDate = currentDate
      }
    })

    return Math.max(maxStreak, currentStreak)
  }

  /**
   * Get color based on submission count
   * 
   * Color mapping (matches GitHub/LeetCode):
   * 0 submissions  → #ebedf0 (light gray)
   * 1-2 submissions → #c6e48b (light green)
   * 3-4 submissions → #7bc96f (medium green)
   * 5-9 submissions → #239a3b (dark green)
   * 10+ submissions → #0d3817 (very dark green)
   */
  const getColor = (count) => {
    if (count === 0) return dark ? "#1f2937" : "#ebedf0"
    if (count === 1 || count === 2) return "#c6e48b"
    if (count === 3 || count === 4) return "#7bc96f"
    if (count <= 9) return "#239a3b"
    return "#0d3817"
  }

  const activeDays = calculateActiveDays()
  const maxStreak = calculateMaxStreak()
  const { weeks, monthOrder } = generateCalendar()

  return (
    <motion.section
      id="leetcode"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={scrollTriggerConfig}
    >
      <motion.h2
        className="text-3xl font-bold mb-12 text-center"
        style={{ color: dark ? "white" : "black" }}
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={scrollTriggerConfig}
      >
        LeetCode
      </motion.h2>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={scrollTriggerConfig}
      >
        <motion.div
          className="p-8 rounded-2xl border transition-all hover:shadow-lg"
          style={{
            backgroundColor: dark ? "#111827" : "#f3f4f6",
            borderColor: dark ? "#1f2937" : "#e5e7eb",
          }}
          whileHover={{ y: -2, transition: { duration: 0.3 } }}
        >
          <motion.h3
            className="text-2xl font-semibold mb-8"
            style={{ color: dark ? "white" : "black" }}
            variants={fadeInUpSmallVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollTriggerConfig}
          >
            Competitive Programming
          </motion.h3>

          {loading ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  borderTop: "3px solid #10b981",
                  borderRight: "3px solid transparent",
                }}
              />
              <motion.p
                className="text-sm mt-4"
                style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Updating LeetCode profile...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={scrollTriggerConfig}
            >
              {/* Circular Progress Chart */}
              <motion.div
                className="flex items-center justify-center mb-10"
                variants={fadeInUpVariants}
              >
                <motion.div
                  style={{ position: "relative", width: "200px", height: "200px" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={dark ? "#1f2937" : "#e5e7eb"}
                      strokeWidth="8"
                    />
                    {/* Progress circle - dynamic percentage */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(stats.totalSolved / 3817) * 565.4} 565.4`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 565.4" }}
                      whileInView={{
                        strokeDasharray: `${(stats.totalSolved / 3817) * 565.4} 565.4`,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={scrollTriggerConfig}
                    />
                  </svg>
                  {/* Center Content */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "200px",
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={scrollTriggerConfig}
                  >
                    <motion.div
                      className="text-4xl font-bold"
                      style={{ color: "#10b981", lineHeight: "1" }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={scrollTriggerConfig}
                    >
                      {stats.totalSolved}
                    </motion.div>
                    <motion.div
                      className="text-sm"
                      style={{ color: dark ? "#9ca3af" : "#6b7280", lineHeight: "1" }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={scrollTriggerConfig}
                    >
                      / 3817
                    </motion.div>
                    <motion.div
                      className="text-xs"
                      style={{ color: dark ? "#9ca3af" : "#6b7280", lineHeight: "1" }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      viewport={scrollTriggerConfig}
                    >
                      Solved
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Difficulty Stats Grid */}
              <motion.div
                className="grid grid-cols-3 gap-4 mb-10"
                variants={containerFastVariants}
                initial="hidden"
                whileInView="visible"
                viewport={scrollTriggerConfig}
              >
                <motion.div
                  className="text-center p-4 rounded-lg transition-transform"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                  }}
                  variants={fadeInUpSmallVariants}
                  whileHover={cardHoverVariants.hover}
                >
                  <motion.div
                    className="text-sm font-medium"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={scrollTriggerConfig}
                  >
                    Easy
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold mt-2"
                    style={{ color: "#10b981" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    viewport={scrollTriggerConfig}
                  >
                    {stats.easySolved}
                  </motion.div>
                  <motion.div
                    className="text-xs mt-1"
                    style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={scrollTriggerConfig}
                  >
                    / 922
                  </motion.div>
                </motion.div>

                <motion.div
                  className="text-center p-4 rounded-lg transition-transform"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                  }}
                  variants={fadeInUpSmallVariants}
                  whileHover={cardHoverVariants.hover}
                >
                  <motion.div
                    className="text-sm font-medium"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={scrollTriggerConfig}
                  >
                    Medium
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold mt-2"
                    style={{ color: "#f59e0b" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    viewport={scrollTriggerConfig}
                  >
                    {stats.mediumSolved}
                  </motion.div>
                  <motion.div
                    className="text-xs mt-1"
                    style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={scrollTriggerConfig}
                  >
                    / 1993
                  </motion.div>
                </motion.div>

                <motion.div
                  className="text-center p-4 rounded-lg transition-transform"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                  }}
                  variants={fadeInUpSmallVariants}
                  whileHover={cardHoverVariants.hover}
                >
                  <motion.div
                    className="text-sm font-medium"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={scrollTriggerConfig}
                  >
                    Hard
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold mt-2"
                    style={{ color: "#ef4444" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    viewport={scrollTriggerConfig}
                  >
                    {stats.hardSolved}
                  </motion.div>
                  <motion.div
                    className="text-xs mt-1"
                    style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={scrollTriggerConfig}
                  >
                    / 902
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Contribution Calendar */}
              <motion.div
                className="mt-10 pt-8 border-t"
                style={{ borderColor: dark ? "#1f2937" : "#e5e7eb" }}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={scrollTriggerConfig}
              >
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={scrollTriggerConfig}
                >
                  <motion.p
                    className="text-sm font-semibold"
                    style={{ color: dark ? "#d1d5db" : "#374151" }}
                  >
                    {stats.totalSubmissions} submissions in the past one year
                  </motion.p>
                  <motion.div
                    className="flex gap-6 text-xs"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      viewport={scrollTriggerConfig}
                    >
                      Total active days: {activeDays}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={scrollTriggerConfig}
                    >
                      Max streak: {maxStreak}
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Calendar Grid */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    overflowX: "auto",
                    paddingBottom: "20px",
                  }}
                >
                  {/* Day labels */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      paddingRight: "8px",
                      minHeight: "104px",
                    }}
                  >
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day, idx) => (
                        <span
                          key={idx}
                          className="text-xs"
                          style={{
                            color: dark ? "#9ca3af" : "#6b7280",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {day.substring(0, 1)}
                        </span>
                      )
                    )}
                  </div>

                  {/* Calendar weeks */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    {weeks.map((week, weekIdx) => (
                      <div
                        key={`week-${weekIdx}`}
                        style={{ display: "flex", flexDirection: "column", gap: "2px" }}
                      >
                        {week.map((day, dayIdx) => (
                          <div
                            key={`${day?.timestamp || `empty-${weekIdx}-${dayIdx}`}`}
                            title={
                              day
                                ? `${day.date}: ${day.submissions} ${day.submissions === 1 ? "submission" : "submissions"}`
                                : "No data"
                            }
                            style={{
                              width: "14px",
                              height: "14px",
                              backgroundColor: day
                                ? getColor(day.submissions)
                                : "transparent",
                              borderRadius: "2px",
                              cursor: day ? "pointer" : "default",
                              transition: "all 0.2s ease",
                              border: day && day.submissions > 0 ? "1px solid rgba(255,255,255,0.2)" : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (day && day.submissions > 0) {
                                e.target.style.opacity = "0.8"
                                e.target.style.boxShadow = "0 0 4px rgba(16, 185, 129, 0.5)"
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.opacity = "1"
                              e.target.style.boxShadow = "none"
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month labels */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginTop: "8px",
                    marginLeft: "28px",
                  }}
                >
                  {monthOrder.map((month, idx) => (
                    <div
                      key={idx}
                      style={{ width: "54px", textAlign: "center" }}
                    >
                      <span
                        className="text-xs"
                        style={{
                          color: dark ? "#9ca3af" : "#6b7280",
                        }}
                      >
                        {month}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <motion.div
                  className="flex items-center gap-2 mt-6 justify-end"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  viewport={scrollTriggerConfig}
                >
                  <motion.span
                    className="text-xs"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    Less
                  </motion.span>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: getColor(i),
                        borderRadius: "2px",
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                      viewport={scrollTriggerConfig}
                    />
                  ))}
                  <motion.span
                    className="text-xs"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    More
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Update Status & Manual Refresh Controls */}
              <motion.div
                className="mt-8 pt-6 border-t flex flex-col gap-4"
                style={{ borderColor: dark ? "#1f2937" : "#e5e7eb" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={scrollTriggerConfig}
              >
                {/* Last Update Info */}
                {lastUpdate && (
                  <motion.div
                    className="text-xs flex items-center gap-2"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-green-500">●</span>
                    Last updated: {lastUpdate}
                    <span className="text-xs ml-1" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                      (Auto-refreshes every 10 min)
                    </span>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-4 rounded-lg text-sm flex items-center justify-between"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                      borderLeft: "3px solid #3b82f6",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span>⚠️ {error}</motion.span>
                    <motion.button
                      onClick={fetchStats}
                      disabled={loading}
                      className="ml-4 px-3 py-1 rounded text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-50"
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? "Updating..." : "Retry Now"}
                    </motion.button>
                  </motion.div>
                )}

                {/* Manual Refresh Button - Always Visible */}
                {!error && (
                  <motion.button
                    onClick={fetchStats}
                    disabled={loading}
                    className="w-full px-6 py-2 rounded-lg font-semibold transition-all text-sm"
                    style={{
                      backgroundColor: dark ? "#1f2937" : "#e5e7eb",
                      color: dark ? "#d1d5db" : "#374151",
                      opacity: loading ? 0.6 : 1,
                    }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🔄 Fetching latest stats...
                      </motion.span>
                    ) : (
                      <span>🔄 Refresh Stats Now</span>
                    )}
                  </motion.button>
                )}
              </motion.div>

              {/* Profile Link */}
              <motion.a
                href={`https://leetcode.com/u/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-8 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#ef5350",
                  color: "white",
                }}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={scrollTriggerConfig}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Full LeetCode Profile →
              </motion.a>
            </motion.div>
          )}
</motion.div>
      </motion.div>
    </motion.section>
  )
}

export default LeetCode



