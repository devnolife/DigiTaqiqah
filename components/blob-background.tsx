"use client"

import { motion } from "framer-motion"

export default function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient - more subtle */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0D8A6A]/70 to-[#1D3557]/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated blobs - reduced opacity */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#F8F0D7]/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.8,
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          opacity: { duration: 2 },
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 25,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#C19434]/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.8,
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          opacity: { duration: 2, delay: 0.3 },
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-white/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.8,
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          opacity: { duration: 2, delay: 0.6 },
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          },
        }}
      />

      {/* Additional smaller blobs for more dynamic feel */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#0D8A6A]/15 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          opacity: { duration: 2, delay: 0.9 },
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  )
}

