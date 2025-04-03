"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Gallery images including the new baby photo
const images = [
  "/images/baby-photo.jpg",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      goToPrevious()
    } else if (info.offset.x < -100) {
      goToNext()
    }
  }

  return (
    <motion.div
      className="relative w-full h-72 mb-2"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        ref={constraintsRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative"
            >
              <motion.img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`Baby photo ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />

              {/* Image counter */}
              <motion.div
                className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                {currentIndex + 1} / {images.length}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Navigation arrows with modern styling */}
      <motion.button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors z-10 shadow-md"
        aria-label="Foto sebelumnya"
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronLeft className="h-4 w-4 text-[#0D8A6A]" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors z-10 shadow-md"
        aria-label="Foto selanjutnya"
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronRight className="h-4 w-4 text-[#0D8A6A]" />
      </motion.button>

      {/* Dots indicator with modern styling */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, slideIndex) => (
          <motion.button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              currentIndex === slideIndex ? "bg-[#0D8A6A] w-4" : "bg-[#0D8A6A]/30",
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + slideIndex * 0.1 }}
            aria-label={`Lihat foto ${slideIndex + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

