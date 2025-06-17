"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
      }}
    >
      <Card className={`bg-white/5 border-white/10 backdrop-blur-sm ${className}`}>{children}</Card>
    </motion.div>
  )
}

interface Block3DProps {
  children: ReactNode
  className?: string
}

export function Block3D({ children, className = "" }: Block3DProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <div className="relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg transform translate-x-2 translate-y-2 -z-10" />
    </motion.div>
  )
}
