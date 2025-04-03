"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If the target date has passed, show zeros
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="text-center">
      <motion.h3
        className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Menuju Hari Bahagia
      </motion.h3>

      <div className="flex justify-center gap-3 flex-wrap">
        <TimeUnit value={timeLeft.days} label="Hari" delay={0.3} />
        <TimeUnit value={timeLeft.hours} label="Jam" delay={0.4} />
        <TimeUnit value={timeLeft.minutes} label="Menit" delay={0.5} />
        <TimeUnit value={timeLeft.seconds} label="Detik" delay={0.6} />
      </div>
    </div>
  )
}

function TimeUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring" }}
    >
      <motion.div
        className="bg-white w-14 h-14 rounded-lg shadow-sm flex items-center justify-center border border-[#0D8A6A]/20 relative overflow-hidden"
        initial={{ scale: 1 }}
        animate={{
          scale: value === 0 ? [1, 1.1, 1] : 1,
          boxShadow:
            value <= 3
              ? ["0 0 0 rgba(13, 138, 106, 0)", "0 0 15px rgba(13, 138, 106, 0.5)", "0 0 0 rgba(13, 138, 106, 0)"]
              : "none",
        }}
        transition={{
          duration: 0.3,
          boxShadow: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          },
        }}
      >
        {/* Animated background for seconds */}
        {label === "Detik" && (
          <motion.div
            className="absolute inset-0 bg-[#0D8A6A]/5"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
            }}
          />
        )}

        <motion.span
          className="text-xl font-bold text-[#0D8A6A] relative z-10"
          key={value} // Re-render when value changes
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </motion.div>
      <motion.span
        className="text-xs text-gray-500 mt-1"
        whileHover={{ color: "#0D8A6A" }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

