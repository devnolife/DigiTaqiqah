"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MapPin, Calendar, Clock, Share2, Music, Music2, Star } from "lucide-react"
import PhotoGallery from "./photo-gallery"
import CountdownTimer from "./countdown-timer"
import { Button } from "@/components/ui/button"
import BlobBackground from "./blob-background"
import IslamicPattern from "./islamic-pattern"

// Event date and time
const EVENT_DATE = "2025-04-07T10:00:00"

export default function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // Start with audio paused
  const [audioInitialized, setAudioInitialized] = useState(false) // Track if audio has been initialized
  const [showConfetti, setShowConfetti] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/soundtrack.mp3")
      audio.loop = true
      audio.preload = "auto"
      audioRef.current = audio
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Playback prevented:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    // Open the card after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Function to initialize and play audio after user interaction
  const initializeAndPlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setAudioInitialized(true)
        })
        .catch((error) => {
          console.log("Playback failed:", error)
          setIsPlaying(false)
        })
    }
  }

  const containerVariants = {
    closed: {
      scale: 0.9,
      opacity: 0.8,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const sections = ["intro", "details", "gallery"]

  const handleScroll = (index: number) => {
    setActiveSection(index)
    // In a real app, you would scroll to the section
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  // Format the event date for display
  const formatEventDate = () => {
    const date = new Date(EVENT_DATE)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format the event time for display
  const formatEventTime = () => {
    const date = new Date(EVENT_DATE)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  // Trigger confetti animation
  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  // Function to share the invitation
  const shareInvitation = async () => {
    const shareData = {
      title: 'Undangan Aqiqah Fadhila Aisya Zaviera',
      text: 'Bismillah, Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Aqiqah putri kami.',
      url: window.location.href,
    };

    try {
      // Trigger confetti first
      triggerConfetti();

      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share(shareData);
        setToastMessage("Berhasil membagikan undangan");
        setShowToast(true);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link undangan disalin ke clipboard");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setToastMessage("Gagal membagikan undangan");
      setShowToast(true);
    }

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-white mb-6"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={containerVariants}
    >
      <IslamicPattern />
      <AnimatePresence>
        {isOpen && !audioInitialized && (
          <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={() => {
                initializeAndPlayAudio()
                setIsPlaying(true)
              }}
              className="bg-white/90 text-[#0D8A6A] rounded-full p-8 shadow-lg flex flex-col items-center justify-center w-64 h-64 mt-[-15vh]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl text-center">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</span>
              <span className="mt-3 text-sm">Tekan untuk mulai</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 50 }).map((_, i) => {
              // Use deterministic values based on index instead of Math.random()
              const left = `${(i % 10) * 10 + 5}%`;
              const yOffset = `${100 + (i % 5) * 10}%`;
              const xOffset = `${((i % 7) - 3) * 25}%`;
              const rotationDeg = (i * 36) % 360;
              const duration = 2 + (i % 5) * 0.5;
              const bgColor = i % 3 === 0 ? "#0D8A6A" : i % 3 === 1 ? "#C19434" : "#F8F0D7";

              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    top: "-5%",
                    left: left,
                    background: bgColor,
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: yOffset,
                    x: xOffset,
                    opacity: 0,
                    rotate: rotationDeg,
                  }}
                  transition={{
                    duration: duration,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple music toggle button - only visible after music is initialized */}
      {audioInitialized && (
        <motion.div
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.button
            onClick={toggleMusic}
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Music2 className="h-5 w-5 text-[#0D8A6A]" /> : <Music className="h-5 w-5 text-[#0D8A6A]" />}
          </motion.button>
        </motion.div>
      )}

      {/* Header with modern design */}
      <div className="relative h-64 overflow-hidden">
        <BlobBackground />

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center pt-5"
          variants={itemVariants}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            className="mb-3"
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-[#0D8A6A] mb-3"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(13, 138, 106, 0.5)",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-white drop-shadow-md mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Walimatul Aqiqah
          </motion.h1>

          <motion.p
            className="text-white/90 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Kelahiran putri kedua kami yang bernama
          </motion.p>

          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg relative overflow-hidden w-full min-h-[80px] flex flex-col justify-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
          >
            {/* Animated stars */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#C19434]"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  opacity: 0.3,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  rotate: 360,
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <Star className="h-3 w-3 fill-[#C19434]" />
              </motion.div>
            ))}

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D8A6A] mb-1 relative z-10">Fadhila Aisya Zaviera</h2>
            <p className="text-gray-500 text-xs sm:text-sm relative z-10 mx-1">Buah hati yang kami cintai karena Allah</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Parents' names with modern styling */}
      <motion.div className="px-6 py-6 text-center" variants={itemVariants}>
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="h-px w-12 bg-[#C19434]/60"></div>
          <span className="mx-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Orang Tua</span>
          <div className="h-px w-12 bg-[#C19434]/60"></div>
        </motion.div>

        <div className="flex items-center justify-center space-x-4">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, type: "spring" }}
          >
            <h3 className="font-medium text-[#0D8A6A] text-lg">Bapak Rustan</h3>

          </motion.div>

          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              scale: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1.5,
              },
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
                delay: 0.5,
              },
            }}
          >
            <Heart className="text-[#C19434]/80 fill-[#C19434]/80 h-5 w-5" />
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, type: "spring" }}
          >
            <h3 className="font-medium text-[#0D8A6A] text-lg">Ibu Niswah</h3>
          </motion.div>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        className="px-6 py-4 bg-[#F8F0D7]/30"
        variants={itemVariants}
        whileInView={{
          boxShadow: ["0 0 0 rgba(193, 148, 52, 0)", "0 0 20px rgba(193, 148, 52, 0.3)", "0 0 0 rgba(193, 148, 52, 0)"],
        }}
        transition={{
          boxShadow: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
          },
        }}
      >
        <CountdownTimer targetDate={EVENT_DATE} />
      </motion.div>

      {/* Date and Location with interactive elements */}
      <motion.div className="px-6 py-6 bg-white rounded-lg" variants={itemVariants}>
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="h-px w-12 bg-[#C19434]"></div>
          <span className="mx-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Informasi Acara</span>
          <div className="h-px w-12 bg-[#C19434]"></div>
        </motion.div>

        <motion.div
          className="flex items-start mb-5 p-3 rounded-lg hover:bg-[#F8F0D7]/20 transition-colors"
          whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(193, 148, 52, 0.1)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, type: "spring" }}
        >
          <motion.div
            className="bg-[#F8F0D7]/50 p-2 rounded-lg mr-3"
            whileHover={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Calendar className="h-5 w-5 text-[#0D8A6A]" />
          </motion.div>
          <div>
            <h3 className="font-medium text-gray-800">{formatEventDate()}</h3>
            <p className="text-gray-500 text-sm">Kami mengundang Bapak/Ibu/Saudara/i untuk hadir</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start mb-5 p-3 rounded-lg hover:bg-[#F8F0D7]/20 transition-colors"
          whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(193, 148, 52, 0.1)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, type: "spring" }}
        >
          <motion.div
            className="bg-[#F8F0D7]/50 p-2 rounded-lg mr-3"
            whileHover={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Clock className="h-5 w-5 text-[#0D8A6A]" />
          </motion.div>
          <div>
            <h3 className="font-medium text-gray-800">{formatEventTime()}</h3>
            <p className="text-gray-500 text-sm">Kehadiran Anda sangat berarti bagi kami </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start p-3 rounded-lg hover:bg-[#F8F0D7]/20 transition-colors"
          whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(193, 148, 52, 0.1)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, type: "spring" }}
        >
          <motion.div
            className="bg-[#F8F0D7]/50 p-2 rounded-lg mr-3"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, repeat: 1, repeatType: "reverse" },
            }}
          >
            <MapPin className="h-5 w-5 text-[#0D8A6A]" />
          </motion.div>
          <div>
            <h3 className="font-medium text-gray-800">Lokasi Acara</h3>
            <p className="text-gray-500 text-sm">Jl. A. Palili (Sebelum Puncak Mattugengkeng)</p>
            <Button
              variant="link"
              className="p-0 h-auto text-[#0D8A6A] text-sm mt-1 group"
              onClick={() => window.open("https://www.google.com/maps/place/3%C2%B042'19.4%22S+120%C2%B024'47.0%22E/@-3.7053852,120.4104805,17z/data=!4m4!3m3!8m2!3d-3.7053852!4d120.4130554?entry=ttu&g_ep=EgoyMDI1MDQwMS4wIKXMDSoASAFQAw%3D%3D", "_blank")}
            >
              <span
                className="inline-block group-hover:translate-x-1 transition-transform">Lihat di Peta</span>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Photo Gallery with modern UI */}
      <motion.div className="px-6 py-6 bg-gradient-to-br from-white to-[#F8F0D7]/20" variants={itemVariants}>
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
        >
          <div className="h-px w-12 bg-[#0D8A6A]"></div>
          <span className="mx-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Galeri</span>
          <div className="h-px w-12 bg-[#0D8A6A]"></div>
        </motion.div>

        <PhotoGallery />

        <motion.p
          className="text-center text-sm text-gray-500 mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Geser untuk melihat foto lainnya 👆
        </motion.p>
      </motion.div>

      {/* Footer with share button and gratitude message */}
      <motion.div className="px-6 py-6 text-center border-t border-[#F8F0D7]/20" variants={itemVariants}>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.5 }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
          memberikan doa restu
        </motion.p>

        <motion.div
          className="mb-4 text-center italic text-sm text-[#0D8A6A]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          "Barangsiapa yang dikaruniai anak, lalu ia mengaqiqahinya, maka anak itu akan menjadi tebusan baginya."
          <div className="mt-1 text-xs text-gray-500">- HR. Bukhari -</div>
        </motion.div>

        <motion.button
          className="inline-flex items-center gap-2 bg-[#0D8A6A]/10 hover:bg-[#0D8A6A]/20 text-[#0D8A6A] px-4 py-2 rounded-full text-sm font-medium transition-colors relative overflow-hidden group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(13, 138, 106, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, type: "spring" }}
          onClick={shareInvitation}
        >
          {/* Button shine effect */}
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 1.5,
              ease: "linear",
            }}
          />
          <Share2 className="h-4 w-4" />
          Bagikan Undangan
        </motion.button>

        {/* Toast notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0D8A6A] text-white px-4 py-2 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-6 pt-4 border-t border-[#F8F0D7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <motion.p
            className="text-gray-600 mb-2 text-sm"
            whileInView={{
              textShadow: [
                "0 0 0 rgba(13, 138, 106, 0)",
                "0 0 10px rgba(13, 138, 106, 0.3)",
                "0 0 0 rgba(13, 138, 106, 0)",
              ],
            }}
            transition={{
              textShadow: {
                repeat: 3,
                duration: 2,
                delay: 1,
              },
            }}
          >
            Jazakumullah khairan katsiran. Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i. Semoga Allah SWT
            membalas kebaikan dengan limpahan rahmat dan keberkahan.
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center space-x-2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                scale: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                  delay: 0,
                },
                rotate: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 3,
                  delay: 0.5,
                },
              }}
            >
              <Heart className="text-[#C19434]/80 fill-[#C19434]/80 h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                scale: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                  delay: 0.3,
                },
                rotate: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 3,
                  delay: 0.8,
                },
              }}
            >
              <Heart className="text-[#0D8A6A] fill-[#0D8A6A] h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                scale: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                  delay: 0.6,
                },
                rotate: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 3,
                  delay: 1.1,
                },
              }}
            >
              <Heart className="text-[#C19434]/80 fill-[#C19434]/80 h-4 w-4" />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Dibuat dengan{" "}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                color: ["#C19434", "#0D8A6A", "#C19434"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
            >
              ❤️
            </motion.span>{" "}
            oleh{" "}
            <motion.a
              href="https://github.com/devnolife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D8A6A] hover:underline relative inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(13, 138, 106, 0.3)",
              }}
            >
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0D8A6A]"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              devnolife
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

