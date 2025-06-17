"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
}

export function Fireworks({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = []
      const colors = ["#ff0080", "#00ff80", "#8000ff", "#ff8000", "#0080ff"]

      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        })
      }

      setParticles(newParticles)

      setTimeout(() => setParticles([]), 2000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: particle.color }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x + particle.vx * 100,
            y: particle.y + particle.vy * 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
