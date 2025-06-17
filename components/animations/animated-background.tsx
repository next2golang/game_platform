"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  variant?: "gradient" | "particles" | "waves" | "geometric" | "gaming"
  className?: string
}

export function AnimatedBackground({ variant = "gradient", className = "" }: AnimatedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (variant === "gradient") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 20%)`,
          }}
        />
      </div>
    )
  }

  if (variant === "particles") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "waves") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  if (variant === "geometric") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "gaming") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "conic-gradient(from 0deg at 50% 50%, rgba(168, 85, 247, 0.3) 0deg, rgba(236, 72, 153, 0.3) 120deg, rgba(59, 130, 246, 0.3) 240deg, rgba(168, 85, 247, 0.3) 360deg)",
              "conic-gradient(from 120deg at 50% 50%, rgba(168, 85, 247, 0.3) 0deg, rgba(236, 72, 153, 0.3) 120deg, rgba(59, 130, 246, 0.3) 240deg, rgba(168, 85, 247, 0.3) 360deg)",
              "conic-gradient(from 240deg at 50% 50%, rgba(168, 85, 247, 0.3) 0deg, rgba(236, 72, 153, 0.3) 120deg, rgba(59, 130, 246, 0.3) 240deg, rgba(168, 85, 247, 0.3) 360deg)",
              "conic-gradient(from 0deg at 50% 50%, rgba(168, 85, 247, 0.3) 0deg, rgba(236, 72, 153, 0.3) 120deg, rgba(59, 130, 246, 0.3) 240deg, rgba(168, 85, 247, 0.3) 360deg)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      </div>
    )
  }

  return null
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60" />
        </motion.div>
      ))}
    </div>
  )
}
