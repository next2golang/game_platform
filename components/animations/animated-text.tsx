"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50 + delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-purple-400 ml-1"
      />
    </motion.div>
  )
}

interface VaporizeTextProps {
  texts: string[]
  className?: string
}

export function VaporizeText({ texts, className = "" }: VaporizeTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVaporizing, setIsVaporizing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVaporizing(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsVaporizing(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <motion.div className={className}>
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVaporizing ? 0 : 1,
          y: isVaporizing ? -20 : 0,
          filter: isVaporizing ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        {texts[currentIndex]}
      </motion.span>
    </motion.div>
  )
}

interface EncryptionTextProps {
  text: string
  className?: string
  trigger?: boolean
}

export function EncryptionText({ text, className = "", trigger = false }: EncryptionTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isEncrypting, setIsEncrypting] = useState(false)

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    if (trigger && !isEncrypting) {
      setIsEncrypting(true)
      let iterations = 0

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return text[index]
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(""),
        )

        if (iterations >= text.length) {
          clearInterval(interval)
          setIsEncrypting(false)
        }

        iterations += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }
  }, [trigger, text, chars, isEncrypting])

  return <motion.span className={className}>{displayText}</motion.span>
}
