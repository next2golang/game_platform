"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrails((prev) => [...prev.slice(-10), newTrail])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          initial={{
            x: trail.x - 4,
            y: trail.y - 4,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  )
}

interface CursorAttractProps {
  children: React.ReactNode
  className?: string
}

export function CursorAttract({ children, className = "" }: CursorAttractProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setMousePosition({
      x: (e.clientX - centerX) * 0.1,
      y: (e.clientY - centerY) * 0.1,
    })
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}
