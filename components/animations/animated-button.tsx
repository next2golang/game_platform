"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { type ReactNode, useState } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        onClick={onClick}
        className={`relative overflow-hidden ${className}`}
        variant={variant}
        size={size}
        disabled={disabled}
        type={type}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

export function MetallicButton({ children, onClick, className = "", disabled = false }: AnimatedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 
        border border-slate-600 rounded-lg text-white font-semibold
        shadow-lg hover:shadow-xl transition-all duration-300
        ${className}
      `}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export function HoverForceButton({ children, onClick, className = "" }: AnimatedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-6 py-3 bg-transparent border-2 border-purple-500 
        text-purple-400 font-semibold rounded-lg overflow-hidden
        ${className}
      `}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-purple-500"
        variants={{
          hover: { scale: 1, opacity: 1 },
        }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="relative z-10"
        variants={{
          hover: { color: "#ffffff" },
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
