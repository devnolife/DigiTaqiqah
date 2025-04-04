"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

// Create fixed positions for the patterns to avoid hydration errors
const FIXED_POSITIONS = [
  { top: "12.7%", left: "27.7%" },
  { top: "81.4%", left: "23.2%" },
  { top: "75.7%", left: "84.4%" },
  { top: "68.7%", left: "16.3%" },
  { top: "99.0%", left: "17.8%" },
  { top: "34.6%", left: "18.1%" },
]

export default function IslamicPattern() {
  // Use useMemo to ensure consistent patterns between renders
  const patterns = useMemo(() => {
    return FIXED_POSITIONS.map((position, i) => ({
      ...position,
      rotate: i % 2 === 0 ? 360 : -360,
      duration: 20 + i * 5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
      {/* Top right corner pattern */}
      <motion.div
        className="absolute -top-16 -right-16 w-64 h-64 opacity-30"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#0D8A6A">
          <path d="M50,0 L100,50 L50,100 L0,50 Z" />
          <path d="M50,10 L90,50 L50,90 L10,50 Z" />
          <path d="M50,20 L80,50 L50,80 L20,50 Z" />
          <path d="M50,30 L70,50 L50,70 L30,50 Z" />
        </svg>
      </motion.div>

      {/* Bottom left corner pattern */}
      <motion.div
        className="absolute -bottom-16 -left-16 w-64 h-64 opacity-30"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: -360, scale: 1 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#C19434">
          <path d="M50,0 L100,50 L50,100 L0,50 Z" />
          <path d="M50,10 L90,50 L50,90 L10,50 Z" />
          <path d="M50,20 L80,50 L50,80 L20,50 Z" />
          <path d="M50,30 L70,50 L50,70 L30,50 Z" />
        </svg>
      </motion.div>

      {/* Scattered small patterns */}
      {patterns.map((pattern, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 opacity-20"
          style={{
            top: pattern.top,
            left: pattern.left,
          }}
          initial={{ rotate: 0, scale: 0.5 }}
          animate={{
            rotate: pattern.rotate,
            scale: [0.5, 0.7, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: pattern.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            y: {
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={i % 2 === 0 ? "#0D8A6A" : "#C19434"}>
            <path d="M50,0 L100,50 L50,100 L0,50 Z" />
            <path d="M50,20 L80,50 L50,80 L20,50 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

