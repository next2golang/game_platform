"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
}

export function ParticleSystem({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = []
      const colors = ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"]

      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        })
      }

      setParticles(newParticles)

      setTimeout(() => setParticles([]), 3000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x + particle.vx * 150,
            y: particle.y + particle.vy * 150,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
