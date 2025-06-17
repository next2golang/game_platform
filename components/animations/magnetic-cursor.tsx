"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Trailing cursor */}
      <motion.div
        className="absolute w-8 h-8 border-2 border-purple-400/50 rounded-full"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute w-12 h-12 border border-pink-400/30 rounded-full"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          opacity: isVisible ? 0.5 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </div>
  )
}

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticElement({ children, className = "", strength = 0.3 }: MagneticElementProps) {
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setElementPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setElementPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: elementPosition.x,
        y: elementPosition.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}
