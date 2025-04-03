"use client"

import { motion } from "framer-motion"

export default function IslamicPattern() {
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
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ rotate: 0, scale: 0.5 }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
            scale: [0.5, 0.7, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20 + i * 5,
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

